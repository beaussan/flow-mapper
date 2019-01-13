import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCreation } from '../types/userCreation';
import { Store } from '@ngxs/store';
import { CreateUser } from '../state/users.actions';

@Component({
  selector: 'fl-user-create-modal',
  templateUrl: './user-create-modal.component.html',
  styleUrls: ['./user-create-modal.component.scss'],
})
export class UserCreateModalComponent implements OnInit {
  createUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserCreateModalComponent>,
    private readonly fb: FormBuilder,
    private readonly store: Store,
  ) {}

  ngOnInit() {
    this.createUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      isSuperUser: [false],
      isActive: [true],
      canEditFlows: [true],
      canEditApps: [true],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitClick(): void {
    const user = new UserCreation();
    user.email = this.createUserForm.get('email').value;
    user.name = this.createUserForm.get('name').value;
    user.password = this.createUserForm.get('password').value;
    user.isSuperUser = this.createUserForm.get('isSuperUser').value;
    user.roles = [];
    if (this.createUserForm.get('isActive').value) {
      user.roles = ['ROLE_USER'];
    }
    if (this.createUserForm.get('canEditFlows').value) {
      user.roles = [...user.roles, 'ROLE_EDIT_FLOW'];
    }
    if (this.createUserForm.get('canEditApps').value) {
      user.roles = [...user.roles, 'ROLE_EDIT_APPS'];
    }

    this.store.dispatch(new CreateUser(user));
    this.dialogRef.close();
  }
}
