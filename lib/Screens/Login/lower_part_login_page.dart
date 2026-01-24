import 'package:flutter/material.dart';
import 'package:payment/Screens/Login/form_lower_half.dart';

class LowerPartLoginPage extends StatelessWidget {
  const LowerPartLoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 20),
      width: MediaQuery.of(context).size.width,
      decoration: const BoxDecoration(
        color: Color(0xFF1F1F1F),
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(40),
          topRight: Radius.circular(40),
        ),
      ),
      child: Container(
        margin: const EdgeInsets.only(top: 40, left: 30, right: 30),
        child: Column(
          spacing: 30,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [LoginID(), LoginPassword(), FormLowerHalf()],
        ),
      ),
    );
  }
}

//for login id
class LoginID extends StatelessWidget {
  const LoginID({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      spacing: 5,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("User ID"),
        TextFormField(
          validator: (value) {
            if (value == null || value.isEmpty) {
              return 'Please enter some text';
            }
            return null;
          },
          decoration: InputDecoration(
            filled: true,
            fillColor: Color(0xFF303030),
            hintText: "Enter your User ID",
            hintStyle: const TextStyle(color: Colors.grey),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide.none,
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide(color: Colors.deepPurpleAccent, width: 2),
            ),
          ),
        ),
      ],
    );
  }
}

//for login password
class LoginPassword extends StatefulWidget {
  const LoginPassword({super.key});

  @override
  State<LoginPassword> createState() => _LoginPasswordState();
}

class _LoginPasswordState extends State<LoginPassword> {
  bool _isPasswordVisible = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      spacing: 5,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("MPIN/Password"),
        TextFormField(
          obscureText: _isPasswordVisible,
          decoration: InputDecoration(
            filled: true,
            fillColor: Color(0xFF303030),
            hintText: "Enter your MPIN/Password",
            hintStyle: TextStyle(color: Colors.grey),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide.none,
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide(color: Colors.deepPurpleAccent, width: 2),
            ),
            suffixIcon: IconButton(
              icon: Icon(
                _isPasswordVisible ? Icons.visibility : Icons.visibility_off,
                color: Colors.grey,
              ),
              onPressed: () {
                setState(() {
                  _isPasswordVisible = !_isPasswordVisible;
                });
              },
            ),
          ),
        ),
      ],
    );
  }
}
