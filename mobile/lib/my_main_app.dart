import 'package:flutter/material.dart';

import 'package:e_coleta/theme/styles.dart';
import 'package:e_coleta/my_app_routes.dart';

class MyMainApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return _MyMainApp();
  }
}

class _MyMainApp extends StatelessWidget {
  const _MyMainApp({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Catalog',
      theme: kAppTheme,
      routes: kAppRoutingTable,
    );
  }
}
