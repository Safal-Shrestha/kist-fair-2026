import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:payment/Screens/Login/login_page.dart';
import 'package:payment/Screens/NewAppLandingPage/landing_container.dart';
import 'package:payment/styles.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  bool _isOldUser = false;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _checkUser();
  }

  Future<void> _checkUser() async {
    final storage = const FlutterSecureStorage();
    String? phoneNumber = await storage.read(key: 'phone_number');
    await Future.delayed(Duration(seconds: 1));
    setState(() {
      _isOldUser = phoneNumber != null && phoneNumber.isNotEmpty ? true : false;
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return MaterialApp(
        themeMode: ThemeMode.dark,
        theme: ThemeData(
          brightness: Brightness.light,
          primarySwatch: Colors.blue,
          scaffoldBackgroundColor: Colors.white,
        ),
        darkTheme: ThemeData(
          brightness: Brightness.dark,
          primarySwatch: Colors.indigo,
          scaffoldBackgroundColor: const Color(0xFF121212),
          appBarTheme: const AppBarTheme(backgroundColor: Color(0xFF1F1F1F)),
        ),
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          body: Center(
            child: CircularProgressIndicator(
              color: Styles.primaryColor,
              strokeWidth: 6,
              strokeCap: StrokeCap.round,
            ),
          ),
        ),
      );
    }
    return MaterialApp(
      themeMode: ThemeMode.dark,
      theme: ThemeData(
        brightness: Brightness.light,
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: Colors.white,
      ),
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.indigo,
        scaffoldBackgroundColor: Styles.backgroundColor,
        appBarTheme: const AppBarTheme(backgroundColor: Styles.backgroundColor),
      ),
      debugShowCheckedModeBanner: false,
      home: _isOldUser ? LoginPage() : LandingContainer(),
    );
  }
}
