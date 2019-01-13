import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { map, startWith, flatMap } from 'rxjs/operators';
import { AppState } from '../../state/app.state';
import { App } from '../../types/app';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocomplete,
} from '@angular/material';

import { FlowTechnosState } from '../../state/flow-technos.state';
import { FlowTechno } from '../../types/flow-technos';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';
import { FuseTranslationLoaderService } from '../../../@fuse/services/translation-loader.service';

export interface CreateFlowDialogData {
  name: string;
  description: string;
  sourceAppId: number;
  destinationAppId: number;
  flowTechnos: string[];
}

@Component({
  selector: 'fl-create-flow-dialog',
  templateUrl: './create-flow-dialog.component.html',
  styleUrls: ['./create-flow-dialog.component.scss'],
})
export class CreateFlowDialogComponent implements OnInit {
  createForm: FormGroup;

  @Select(AppState.apps)
  apps$: Observable<App[]>;

  @Select(FlowTechnosState.flowTechnos)
  flowTechnos$: Observable<FlowTechno[]>;

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
    public dialogRef: MatDialogRef<CreateFlowDialogComponent>,
    private fuseTranslationLoaderService: FuseTranslationLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: CreateFlowDialogData,
  ) {
    this.filteredTechnos = this.technoCtrl.valueChanges.pipe(
      startWith(null),
      flatMap((techno: string | null) =>
        techno
          ? this._filter(techno)
          : this.flowTechnos$.pipe(map(val => val.map(item => item.name))),
      ),
    );
    this.fuseTranslationLoaderService.loadTranslations(english, french);
  }

  ngOnInit() {
    this.createForm = this.fb.group({
      name: [''],
      description: [''],
      sourceAppId: [],
      destinationAppId: [],
      flowTechnos: [[]],
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

    return this.flowTechnos$.pipe(
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
