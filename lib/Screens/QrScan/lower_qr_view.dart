import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:payment/styles.dart';
import 'package:qr_flutter/qr_flutter.dart';

class LowerQrView extends StatefulWidget {
  const LowerQrView({super.key});

  @override
  State<LowerQrView> createState() => _LowerQrViewState();
}

class _LowerQrViewState extends State<LowerQrView> {
  final DraggableScrollableController draggableScrollableController =
      DraggableScrollableController();

  bool isExpanded = false;

  @override
  void initState() {
    super.initState();
    draggableScrollableController.addListener(_handleScroll);
  }

  void _handleScroll() {
    if (!draggableScrollableController.isAttached) return;

    final currentSize = draggableScrollableController.size;
    final shouldBeExpanded = currentSize > 0.475;

    if (shouldBeExpanded != isExpanded) {
      if (mounted) {
        setState(() {
          isExpanded = shouldBeExpanded;
        });
      }
    }
  }

  @override
  void dispose() {
    draggableScrollableController.removeListener(_handleScroll);
    draggableScrollableController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return DraggableScrollableSheet(
      controller: draggableScrollableController,
      snap: true,
      snapSizes: [0.1, 0.75],
      initialChildSize: 0.1,
      minChildSize: 0.1,
      maxChildSize: 0.75,
      builder: (BuildContext context, ScrollController scrollController) {
        return Container(
          decoration: BoxDecoration(
            color: Styles.fillColor,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(20),
              topRight: Radius.circular(20),
            ),
          ),
          child: CustomScrollView(
            controller: scrollController,
            slivers: [
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.only(left: 20, right: 10, top: 30),
                  child: Container(
                    decoration: BoxDecoration(
                      border: Border(
                        bottom: BorderSide(color: Color(0xFF424242), width: 1),
                      ),
                    ),
                    child: Row(
                      children: [
                        Expanded(
                          child: Text(
                            "My QR",
                            style: TextStyle(
                              color: Styles.primaryColor,
                              fontSize: 20,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                        SizedBox(
                          width: 40,
                          height: 40,
                          child: IconButton(
                            style: IconButton.styleFrom(
                              padding: EdgeInsets.only(left: 0, right: 0),
                            ),
                            onPressed: () {
                              setState(() {
                                if (isExpanded) {
                                  draggableScrollableController.animateTo(
                                    0.1,
                                    duration: Duration(milliseconds: 400),
                                    curve: Curves.easeInOut,
                                  );
                                } else {
                                  draggableScrollableController.animateTo(
                                    0.75,
                                    duration: Duration(milliseconds: 400),
                                    curve: Curves.easeInOut,
                                  );
                                }
                              });
                              isExpanded = !isExpanded;
                            },
                            icon: Icon(
                              isExpanded
                                  ? Icons.arrow_drop_down
                                  : Icons.arrow_drop_up,
                              color: Styles.primaryColor,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              SliverToBoxAdapter(child: ViewQr()),
            ],
          ),
        );
      },
    );
  }
}

class ViewQr extends StatefulWidget {
  const ViewQr({super.key});

  @override
  State<ViewQr> createState() => _ViewQrState();
}

class _ViewQrState extends State<ViewQr> {
  late final qrData;
  late final pNumber;

  @override
  void initState() {
    super.initState();
    _generateQrData();
  }

  Future<void> _generateQrData() async {
    final storage = const FlutterSecureStorage();
    String? phoneNumber = await storage.read(key: 'phone_number');
    setState(() {
      qrData = phoneNumber;
      pNumber = phoneNumber;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      spacing: 10,
      children: [
        Padding(
          padding: const EdgeInsets.only(top: 80),
          child: Align(
            child: Container(
              width: 260,
              height: 260,
              clipBehavior: Clip.hardEdge,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(30),
                border: BoxBorder.all(color: Color(0x53272727), width: 4),
                color: Colors.white,
              ),
              child: QrImageView(
                data: qrData ?? 'No Data Found',
                version: QrVersions.auto,
                padding: EdgeInsets.all(20),
              ),
            ),
          ),
        ),
        Center(
          child: Padding(
            padding: const EdgeInsets.only(top: 40),
            child: Text("Scan to receive payment"),
          ),
        ),
        Center(
          child: Column(
            spacing: 5,
            children: [
              Text(
                "Bipin Thapa",
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
              ),
              Text(pNumber ?? "No Data Found"),
            ],
          ),
        ),
      ],
    );
  }
}
