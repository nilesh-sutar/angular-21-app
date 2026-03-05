import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
    <h2>Register</h2>
    <form>
      <div class="mb-3 mt-3">
        <label for="username">Username:</label>
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder="Enter username"
          name="username"
        />
      </div>
      <div class="mb-3">
        <label for="pwd">Password:</label>
        <input
          type="password"
          class="form-control"
          id="pwd"
          placeholder="Enter password"
          name="pswd"
        />
      </div>
      <div class="mb-3">
        <label for="confirm-pwd">Confirm Password:</label>
        <input
          type="password"
          class="form-control"
          id="confirm-pwd"
          placeholder="Confirm password"
          name="confirm-pswd"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <p class="mt-3">
        Already have an account? <a routerLink="/auth/login" class="btn-link">Login here</a>
    </p>
  `,
  styles: [``],
  imports: [RouterLink]
})
export class Register implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
