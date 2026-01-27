import 'package:flutter/material.dart';

class UpperPart extends StatelessWidget {
  const UpperPart({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [IconsContainer(), WelcomeMessage()],
    );
  }
}

//icon container
class IconsContainer extends StatelessWidget {
  const IconsContainer({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 60),
      child: Row(
        children: [
          Expanded(
            flex: 5,
            child: Container(
              margin: EdgeInsets.only(left: 20),
              child: Text(
                "e-Sikka",
                style: TextStyle(
                  fontSize: 38,
                  fontWeight: FontWeight.bold,
                  color: Colors.deepPurpleAccent,
                ),
              ),
            ),
          ),
          Expanded(
            flex: 1,
            child: Center(
              child: Container(
                decoration: BoxDecoration(shape: BoxShape.circle),
                child: Navigator.canPop(context)
                    ? IconButton(
                        onPressed: () {
                          Navigator.pop(context);
                        },
                        icon: Icon(
                          Icons.close,
                          color: Colors.deepPurpleAccent,
                          size: 32,
                        ),
                      )
                    : const SizedBox.shrink(),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class WelcomeMessage extends StatelessWidget {
  const WelcomeMessage({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 80,
      margin: const EdgeInsets.only(left: 20, top: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Welcome Back!",
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
          ),
          Text("Login below", style: TextStyle(fontSize: 16)),
        ],
      ),
    );
  }
}
