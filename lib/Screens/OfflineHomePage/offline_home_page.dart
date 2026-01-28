import 'package:flutter/material.dart';
import 'package:payment/Screens/OfflineHomePage/offline_features.dart';
import 'package:payment/styles.dart';

class OfflineHomePage extends StatelessWidget {
  const OfflineHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: Icon(Icons.wifi_off),
        title: Text(
          "Offline Mode",
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      body: Column(children: [OfflineHelp(), OfflineFeatures()]),
    );
  }
}

class OfflineHelp extends StatelessWidget {
  const OfflineHelp({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        margin: EdgeInsets.only(top: 40),
        padding: EdgeInsets.only(top: 20, bottom: 20),
        decoration: BoxDecoration(
          color: Styles.fillColor,
          borderRadius: BorderRadius.circular(20),
        ),
        width: MediaQuery.of(context).size.width * 0.95,
        child: Column(
          spacing: 20,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              spacing: 10,
              children: [
                Icon(Icons.info, color: Styles.primaryColor),
                Text(
                  "No Internet Connection",
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
                ),
              ],
            ),
            Text("Offline mode has features like delayed payment!"),
          ],
        ),
      ),
    );
  }
}
