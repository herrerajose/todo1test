import { Component, OnInit } from '@angular/core';
import { Pages } from 'src/const/pages';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages: any = Pages;
  
  constructor() { }

  ngOnInit() { }

}
