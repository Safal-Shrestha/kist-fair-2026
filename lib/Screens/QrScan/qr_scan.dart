import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:payment/Screens/QrScan/lower_qr_view.dart';
import 'package:payment/styles.dart';

class QrScan extends StatefulWidget {
  const QrScan({super.key});

  @override
  State<QrScan> createState() => _QrScanState();
}

class _QrScanState extends State<QrScan> {
  final MobileScannerController scannerController = MobileScannerController(
    detectionSpeed: DetectionSpeed.noDuplicates,
    facing: CameraFacing.back,
  );
  @override
  void dispose() {
    scannerController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          QrScannerCamera(controller: scannerController), //for the qr scanning
          OverlayWidgets(), //for the dark overlay
          Center(
            child: Container(
              height: 250,
              width: 250,
              decoration: BoxDecoration(
                border: Border.all(color: Styles.primaryColor, width: 3),
                borderRadius: BorderRadius.circular(20),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AppBarControls(controller: scannerController),
                Padding(
                  padding: const EdgeInsets.only(top: 60),
                  child: Center(
                    child: Text(
                      "e-Sikka",
                      style: TextStyle(
                        fontSize: 60,
                        fontWeight: FontWeight.w600,
                        color: Styles.primaryColor,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          LowerQrView(),
        ],
      ),
    );
  }
}

class QrScannerCamera extends StatelessWidget {
  final MobileScannerController controller;
  const QrScannerCamera({super.key, required this.controller});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        const double scanSize = 250.0;
        final Rect scanWindow = Rect.fromCenter(
          center: Offset(constraints.maxWidth / 2, constraints.maxHeight / 2),
          width: scanSize,
          height: scanSize,
        );
        return MobileScanner(
          controller: controller,
          // scanWindow: scanWindow,
          onDetect: (capture) async {
            final List<Barcode> barcodes = capture.barcodes;
            for (final barcode in barcodes) {
              await controller.stop();
              debugPrint("Scanned barcode: ${barcode.rawValue}");
              if (context.mounted) {
                Navigator.pop(context);
              }
            }
          },
        );
      },
    );
  }
}

class OverlayWidgets extends StatefulWidget {
  const OverlayWidgets({super.key});

  @override
  State<OverlayWidgets> createState() => _OverlayWidgetsState();
}

class _OverlayWidgetsState extends State<OverlayWidgets> {
  @override
  Widget build(BuildContext context) {
    return ColorFiltered(
      colorFilter: ColorFilter.mode(
        Colors.black.withValues(alpha: 0.7),
        BlendMode.srcOut,
      ),
      child: Stack(
        children: [
          Center(
            child: Container(
              height: 250,
              width: 250,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class AppBarControls extends StatefulWidget {
  final MobileScannerController controller;
  const AppBarControls({super.key, required this.controller});

  @override
  State<AppBarControls> createState() => _AppBarControlsState();
}

class _AppBarControlsState extends State<AppBarControls> {
  bool isFlashOn = false;
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back),
        ),
        Expanded(
          child: Center(
            child: Text(
              "Scan to Pay",
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
          ),
        ),
        IconButton(
          onPressed: () {
            widget.controller.toggleTorch();
            setState(() {
              isFlashOn = !isFlashOn;
            });
          },
          icon: isFlashOn
              ? Icon(Icons.flash_on, color: Styles.primaryColor)
              : Icon(Icons.flash_off),
        ),
      ],
    );
  }
}
