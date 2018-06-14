import { Component } from '@angular/core';


//Menu Tabs = Page
import { FavPage } from '../fav/fav';
import { GooglemapPage } from '../googlemap/googlemap';
import { HomePage } from '../home/home';
import { InfoPage } from './../info/info';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FavPage;
  tab3Root = GooglemapPage;
  tab4Root = InfoPage;

  constructor() {

  }
}