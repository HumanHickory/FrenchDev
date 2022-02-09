import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewsComponent } from './Views/news/news.component';
import { VerbsSettingsComponent } from './Views/verbs-settings/verbs-settings.component';
import { VerbsComponent } from './Views/verbs/verbs.component';

const routes: Routes = [
  {path: '', component: VerbsComponent},
  {path: 'verbs', component: VerbsComponent},
  {path: 'settings', component: VerbsSettingsComponent, outlet: 'settings'},
  {path: 'news', component: NewsComponent, outlet: 'news'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
