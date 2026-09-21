import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: ListView(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                CircleAvatar(
                  radius: 50,
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  child: const Text('U', style: TextStyle(fontSize: 32, color: Colors.white)),
                ),
                const SizedBox(height: 16),
                Text('User Name', style: Theme.of(context).textTheme.headlineSmall),
                const Text('user@example.com'),
              ],
            ),
          ),
          const Divider(),
          ListTile(
            leading: const Icon(Icons.bookmark),
            title: const Text('Bookmarks'),
            trailing: const Icon(Icons.arrow_forward),
            onTap: () {},
          ),
          ListTile(
            leading: const Icon(Icons.favorite),
            title: const Text('Favorites'),
            trailing: const Icon(Icons.arrow_forward),
            onTap: () {},
          ),
          ListTile(
            leading: const Icon(Icons.history),
            title: const Text('Reading History'),
            trailing: const Icon(Icons.arrow_forward),
            onTap: () {},
          ),
          const Divider(),
          ListTile(
            leading: const Icon(Icons.edit),
            title: const Text('Edit Profile'),
            trailing: const Icon(Icons.arrow_forward),
            onTap: () {},
          ),
          ListTile(
            leading: const Icon(Icons.lock),
            title: const Text('Change Password'),
            trailing: const Icon(Icons.arrow_forward),
            onTap: () {},
          ),
          ListTile(
            leading: const Icon(Icons.logout),
            title: const Text('Sign Out'),
            trailing: const Icon(Icons.arrow_forward),
            onTap: () {},
          ),
        ],
      ),
    );
  }
}
