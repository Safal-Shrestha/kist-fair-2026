import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:internet_connection_checker_plus/internet_connection_checker_plus.dart';
import 'package:payment/Screens/Login/login_page.dart';
import 'package:payment/Screens/NewAppLandingPage/landing_container.dart';
import 'package:payment/styles.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]).then((
    _,
  ) {
    runApp(MyApp());
  });
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  bool _isOldUser = false;
  bool _isLoading = true;
  bool _isConnectedToNetwork = true;

  @override
  void initState() {
    super.initState();
    _checkUser();
    _getNetworkStatus();
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

  //to check if wifi is working or not
  Future<void> _getNetworkStatus() async {
    // Check the hardware connection
    var connectivityResult = await (Connectivity().checkConnectivity());

    if (connectivityResult.contains(ConnectivityResult.wifi)) {
      // Check if the Wi-Fi actually has internet access
      bool hasInternet = await InternetConnection().hasInternetAccess;

      setState(() {
        _isConnectedToNetwork = true;
      });
    } else if (connectivityResult.contains(ConnectivityResult.mobile)) {
      setState(() {
        _isConnectedToNetwork = true;
      });
    } else {
      setState(() {
        _isConnectedToNetwork = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      themeMode: ThemeMode.dark,
      theme: ThemeData(
        fontFamily: 'NeueRegarde',
        brightness: Brightness.light,
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: Colors.white,
      ),
      darkTheme: ThemeData(
        fontFamily: 'NeueRegarde',
        brightness: Brightness.dark,
        primarySwatch: Colors.indigo,
        scaffoldBackgroundColor: Styles.backgroundColor,
        appBarTheme: const AppBarTheme(backgroundColor: Styles.backgroundColor),
      ),
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: _isConnectedToNetwork
            ? _isLoading
                  ? Center(child: CircularProgressIndicator())
                  : _isOldUser
                  ? LoginPage()
                  : LandingContainer()
            : Container(),
      ),
    );
  }
}
