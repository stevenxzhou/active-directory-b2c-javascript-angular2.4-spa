import { Component }    from '@angular/core';
import { Location }     from '@angular/common';
import { BroadcastService } from '@azure/msal-angular';
import { MsalService } from '@azure/msal-angular';
import { Subscription } from "rxjs/Subscription";

declare var bootbox: any;

@Component({
  selector: 'my-app',
  templateUrl: './app.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

    B2CTodoAccessTokenKey = "b2c.todo.access.token";
    
    public loggedIn: boolean;
    public isIframe: boolean;
    private subscription: Subscription;

    constructor(
      private location: Location,
      private authService: MsalService,
      private broadcastService: BroadcastService
    ){
        //  This is to avoid reload during acquireTokenSilent() because of hidden iframe
        this.isIframe = window !== window.parent && !window.opener;
        if(this.authService.getUser())
        {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
        }
    }

    login(): void {
        var _this = this;
        this.authService.loginPopup(["user.read" ,"api://a88bb933-319c-41b5-9f04-eff36d985612/access_as_user"]).then(function (idToken: any) {
            _this.authService.acquireTokenSilent(["https://fabrikamb2c.onmicrosoft.com/demoapi/demo.read"]).then(
                function (accessToken: any) {
                    _this.saveAccessTokenToCache(accessToken);
                }, function (error: any) {
                    _this.authService.acquireTokenPopup(["https://fabrikamb2c.onmicrosoft.com/demoapi/demo.read"]).then(
                        function (accessToken: any) {
                            _this.saveAccessTokenToCache(accessToken);
                        }, function (error: any) {
                            bootbox.alert("Error acquiring the popup:\n" + error);
                        });
                })
        }, function (error: any) {
            bootbox.alert("Error during login:\n" + error);
        });
    }
    
    saveAccessTokenToCache(accessToken: string): void {
        sessionStorage.setItem(this.B2CTodoAccessTokenKey, accessToken);
    };

    logout(): void {
        this.authService.logout();
    };

    isActive(viewLocation: any): boolean {        
        return viewLocation === this.location.path();
    };

    isOnline(): boolean {
        return this.loggedIn;
    };

    ngOnInit() {

        this.broadcastService.subscribe("msal:loginFailure", (payload) => {
          console.log("login failure " + JSON.stringify(payload));
          this.loggedIn = false;
    
        });
    
        this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
          console.log("login success " + JSON.stringify(payload));
          this.loggedIn = true;
        });
    
    }

    ngOnDestroy() {
        this.broadcastService.getMSALSubject().next(1);
        if(this.subscription) {
          this.subscription.unsubscribe();
        }
    }
}