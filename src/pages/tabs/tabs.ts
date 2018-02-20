import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { MyGroupsPage } from "../my-groups/my-groups";
import { MyFriendsPage } from "../my-friends/my-friends";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MyGroupsPage;
  tab3Root = MyFriendsPage;

  constructor() {

  }
}
