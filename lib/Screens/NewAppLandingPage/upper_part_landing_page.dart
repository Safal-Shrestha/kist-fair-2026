import 'package:flutter/material.dart';

class UpperPart extends StatelessWidget {
  const UpperPart({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          ImageContainer(),
          Title(),
          Slogan(),
        ]
      ),
    );
  }
}

class ImageContainer extends StatelessWidget {
  const ImageContainer({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
            height: 250,
            width: 250,
            decoration: BoxDecoration(
                shape: BoxShape.circle,
                image: DecorationImage(image: AssetImage('assets/luffy.webp'),
                    fit: BoxFit.cover)
            ),
          ),
      );
  }
}

class Title extends StatelessWidget {
  const Title({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        margin: EdgeInsets.only(top: 20),
        child: Text(
            "e-Sikka",
            style: TextStyle(fontSize: 40, fontWeight: FontWeight.bold, color: Colors.deepPurpleAccent)
        ),
      ),
    );
  }
}

class Slogan extends StatelessWidget {
  const Slogan({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        margin: EdgeInsets.only(top: 20),
        child: Text(
            "Slogan Here",
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.deepPurple[300])
        ),
      ),
    );
  }
}

