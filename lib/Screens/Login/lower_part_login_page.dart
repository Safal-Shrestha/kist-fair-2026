import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:payment/Screens/HomePage/home_screen.dart';
import 'package:payment/Screens/Login/form_lower_half.dart';
import 'package:payment/styles.dart';

class LowerPartLoginPage extends StatefulWidget {
  const LowerPartLoginPage({super.key});

  @override
  State<LowerPartLoginPage> createState() => _LowerPartLoginPageState();
}

class _LowerPartLoginPageState extends State<LowerPartLoginPage> {
  final Map<String, String> formData = {};

  void _onPressed() async {
    print(formData);

    if (formData['User Id'] == null ||
        formData['User Id']!.isEmpty ||
        formData['MPIN'] == null ||
        formData['MPIN']!.isEmpty) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text("Error"),
            content: Text("Please fill all the fields"),
          );
        },
      );
      return;
    }

    final storage = const FlutterSecureStorage();

    storage.write(key: 'phone_number', value: formData['User Id']);

    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => HomeScreen()),
    );
  }

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
        margin: const EdgeInsets.only(top: 40, left: 20, right: 20),
        child: Column(
          spacing: 30,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            LoginID(
              onChange: (value) {
                formData['User Id'] = value;
              },
            ),
            LoginPassword(
              onChange: (value) {
                formData['MPIN'] = value;
              },
            ),
            FormLowerHalf(onPressed: _onPressed),
          ],
        ),
      ),
    );
  }
}

//for login id
class LoginID extends StatefulWidget {
  final ValueChanged<String> onChange;

  const LoginID({super.key, required this.onChange});

  @override
  State<LoginID> createState() => _LoginIDState();
}

class _LoginIDState extends State<LoginID> {
  final TextEditingController _controller = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadStoredNumber();
  }

  Future<void> _loadStoredNumber() async {
    const storage = FlutterSecureStorage();
    String? phoneNumber = await storage.read(key: 'phone_number');

    if (phoneNumber != null && phoneNumber.isNotEmpty) {
      _controller.text = phoneNumber;
      widget.onChange(phoneNumber);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text("User ID"),
        const SizedBox(height: 5),
        TextFormField(
          controller: _controller,
          validator: (value) => (value == null || value.isEmpty)
              ? 'Please enter some text'
              : null,
          decoration: InputDecoration(
            filled: true,
            fillColor: Styles.fillColor,
            hintText: "Enter your User ID",
            hintStyle: const TextStyle(color: Colors.grey),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide.none,
            ),
          ),
          onChanged: widget.onChange,
        ),
      ],
    );
  }
}

//for login password
class LoginPassword extends StatefulWidget {
  final ValueChanged<String> onChange;

  const LoginPassword({super.key, required this.onChange});

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
        Text("MPIN"),
        TextFormField(
          obscureText: _isPasswordVisible,
          onChanged: widget.onChange,
          decoration: InputDecoration(
            filled: true,
            fillColor: Styles.fillColor,
            hintText: "Enter your MPIN",
            hintStyle: TextStyle(color: Colors.grey),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide.none,
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide(color: Styles.primaryColor, width: 2),
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
