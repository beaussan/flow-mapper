import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatDialogRef,
} from '@angular/material';
import { flatMap, map, startWith } from 'rxjs/operators';
import { CreateFlowDialogData } from '../create-flow-dialog/create-flow-dialog.component';
import { Select } from '@ngxs/store';
import { AppTechnosState } from '../../state/app-technos.state';
import { AppTechno } from '../../types/app-technos';

@Component({
  selector: 'fl-create-app-dialog',
  templateUrl: './create-app-dialog.component.html',
  styleUrls: ['./create-app-dialog.component.scss'],
})
export class CreateAppDialogComponent implements OnInit {
  @Select(AppTechnosState.appTechnos)
  appTechnos$: Observable<AppTechno[]>;

  createForm: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  technoCtrl = new FormControl();
  filteredTechnos: Observable<string[]>;
  selectedTechnos: string[] = [];

  @ViewChild('technoInput') technoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateAppDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateFlowDialogData,
  ) {
    this.filteredTechnos = this.technoCtrl.valueChanges.pipe(
      startWith(null),
      flatMap((techno: string | null) =>
        techno
          ? this._filter(techno)
          : this.appTechnos$.pipe(map(val => val.map(item => item.name))),
      ),
    );
  }

  ngOnInit() {
    this.createForm = this.fb.group({
      name: [''],
      description: [''],
      appTechnos: [[]],
    });
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.selectedTechnos.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.technoCtrl.setValue(null);
    }
  }

  remove(techno: string): void {
    const index = this.selectedTechnos.indexOf(techno);

    if (index >= 0) {
      this.selectedTechnos.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTechnos.push(event.option.viewValue);
    this.technoInput.nativeElement.value = '';
    this.technoCtrl.setValue(null);
  }

  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();

    return this.appTechnos$.pipe(
      map(val => val.map(item => item.name)),
      map(val =>
        val.filter(item => item.toLowerCase().indexOf(filterValue) === 0),
      ),
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
