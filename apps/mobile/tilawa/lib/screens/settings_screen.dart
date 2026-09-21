import 'package:flutter/material.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({Key? key}) : super(key: key);

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _notificationsEnabled = true;
  bool _analyticsEnabled = true;
  String _selectedLanguage = 'English';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: ListView(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text('Display', style: Theme.of(context).textTheme.labelLarge),
          ),
          ListTile(
            title: const Text('Theme'),
            trailing: DropdownButton(
              value: 'System',
              items: const [
                DropdownMenuItem(value: 'Light', child: Text('Light')),
                DropdownMenuItem(value: 'Dark', child: Text('Dark')),
                DropdownMenuItem(value: 'System', child: Text('System')),
              ],
              onChanged: (value) {},
            ),
          ),
          ListTile(
            title: const Text('Language'),
            trailing: DropdownButton(
              value: _selectedLanguage,
              items: const [
                DropdownMenuItem(value: 'English', child: Text('English')),
                DropdownMenuItem(value: 'Arabic', child: Text('Arabic')),
                DropdownMenuItem(value: 'Urdu', child: Text('Urdu')),
              ],
              onChanged: (value) {
                setState(() => _selectedLanguage = value ?? 'English');
              },
            ),
          ),
          const Divider(),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text('Notifications', style: Theme.of(context).textTheme.labelLarge),
          ),
          SwitchListTile(
            title: const Text('Enable Notifications'),
            value: _notificationsEnabled,
            onChanged: (value) {
              setState(() => _notificationsEnabled = value);
            },
          ),
          const Divider(),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text('Privacy', style: Theme.of(context).textTheme.labelLarge),
          ),
          SwitchListTile(
            title: const Text('Share Analytics'),
            value: _analyticsEnabled,
            onChanged: (value) {
              setState(() => _analyticsEnabled = value);
            },
          ),
          ListTile(
            title: const Text('Privacy Policy'),
            trailing: const Icon(Icons.arrow_forward),
            onTap: () {},
          ),
          ListTile(
            title: const Text('Terms of Service'),
            trailing: const Icon(Icons.arrow_forward),
            onTap: () {},
          ),
          const Divider(),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('About', style: Theme.of(context).textTheme.labelLarge),
                const SizedBox(height: 16),
                const Text('TILAWA v1.0.0'),
                const Text('© 2024 TILAWA. All rights reserved.'),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
