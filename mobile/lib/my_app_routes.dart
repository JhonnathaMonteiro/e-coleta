import 'package:e_coleta/pages/carousel_page.dart';
import 'package:e_coleta/pages/home_page.dart';
import 'package:e_coleta/pages/main_page.dart';
import 'package:flutter/material.dart';

final kAppRoutingTable = <String, WidgetBuilder>{
  Navigator.defaultRouteName: (context) => HomePage(),
  MainPage.routeName: (context) => MainPage(),
  CarouselPage.routeName: (context) => CarouselPage(),
};
