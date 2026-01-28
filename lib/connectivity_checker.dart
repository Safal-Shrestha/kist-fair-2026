import 'package:flutter/material.dart';
import 'package:internet_connection_checker_plus/internet_connection_checker_plus.dart';
import 'main.dart';

class ConnectivityProvider with ChangeNotifier {
  bool _isOnline = true;
  bool get isOnline => _isOnline;

  ConnectivityProvider() {
    InternetConnection().onStatusChange.listen((status) {
      bool newStatus = (status == InternetStatus.connected);

      if (newStatus != _isOnline) {
        _isOnline = newStatus;
        _showConnectivitySnackBar(_isOnline);
        notifyListeners();
      }
    });
  }

  void _showConnectivitySnackBar(bool online) {
    messengerKey.currentState?.showSnackBar(
      SnackBar(
        content: Text(
          online ? "Back Online!" : "No Internet Connection",
          style: TextStyle(
            color: online ? Colors.white : Colors.black,
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: online ? Colors.green : Colors.white,
        duration: const Duration(seconds: 4),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }
}
