import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { NgModule }		        from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalModule }           from '@azure/msal-angular';

import { AppComponent }        from '../components/app.component';
import { HomeComponent }        from '../components/home.component';
import { TodoComponent }        from '../components/todo.component';
import { TodoService }          from '../services/todo.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'todo', component: TodoComponent }
];

const tenantConfig = {
    tenant: "fabrikamb2c.onmicrosoft.com",
    clientID: '90c0fe63-bcf2-44d5-8fb7-b8bbc0b29dc6',
    signUpSignInPolicy: "b2c_1_susi",
    b2cScopes: ["https://fabrikamb2c.onmicrosoft.com/demoapi/demo.read"]
};

// Configure the authority for Azure AD B2C
const authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signUpSignInPolicy;

@NgModule({
    imports: [ FormsModule, BrowserModule, HttpModule, RouterModule.forRoot(routes, { useHash: true }), MsalModule.forRoot({
        clientID: tenantConfig.clientID,
        authority: authority,
        validateAuthority: true,
        cacheLocation : "localStorage",
        consentScopes: tenantConfig.b2cScopes
    }) ],
    declarations: [
        HomeComponent,
        TodoComponent,
        AppComponent
    ],
    providers: [
        TodoService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
};
