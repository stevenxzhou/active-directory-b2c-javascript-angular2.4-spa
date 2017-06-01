import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { NgModule }		        from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }         from '../components/app.component/app.component';
import { TodoComponent }        from '../components/todo.component/todo.component';
import { HomeComponent }        from '../components/home.component/home.component';
import { TodoService }          from '../services/todo.service/todo.service';
import { MsalService }          from '../services/msal.service/msal.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'todo', component: TodoComponent }
];

@NgModule({
    imports: [ FormsModule, BrowserModule, HttpModule, RouterModule.forRoot(routes, { useHash: true }) ],
    declarations: [
        AppComponent,
        HomeComponent,
        TodoComponent
    ],
    providers: [
        TodoService,
        MsalService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
};
