import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:payment/Screens/Login/login_page.dart';
import 'package:payment/Screens/NewAppLandingPage/landing_container.dart';
import 'package:payment/Screens/OfflineHomePage/offline_home_page.dart';
import 'package:payment/connectivity_checker.dart';
import 'package:payment/styles.dart';
import 'package:provider/provider.dart';

final GlobalKey<ScaffoldMessengerState> messengerKey =
    GlobalKey<ScaffoldMessengerState>();

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]).then((
    _,
  ) {
    runApp(
      ChangeNotifierProvider(
        create: (context) => ConnectivityProvider(),
        child: const MyApp(),
      ),
    );
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
    return MaterialApp(
      scaffoldMessengerKey: messengerKey,
      builder: (context, child) {
        final network = Provider.of<ConnectivityProvider>(context);
        if (!network.isOnline) {
          return const OfflineHomePage();
        }
        return child!;
      },
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
        body: _isLoading
            ? Center(child: CircularProgressIndicator())
            : _isOldUser
            ? LoginPage()
            : LandingContainer(),
      ),
    );
  }
}
