import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlotComponent } from './plot/plot.component';
import { ChartsModule } from 'ng2-charts';
import { MainComponent } from './main/main.component';
import { FeaturesService } from './services/features.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PlotComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ChartsModule
  ],
  providers: [FeaturesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
