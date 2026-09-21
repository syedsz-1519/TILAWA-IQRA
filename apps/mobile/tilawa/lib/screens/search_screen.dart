import 'package:flutter/material.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({Key? key}) : super(key: key);

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  late TextEditingController _searchController;

  @override
  void initState() {
    super.initState();
    _searchController = TextEditingController();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TextField(
          controller: _searchController,
          decoration: InputDecoration(
            hintText: 'Search Quran, Hadith, Duas...',
            border: InputBorder.none,
            hintStyle: TextStyle(color: Colors.grey.withOpacity(0.7)),
          ),
          onChanged: (value) {
            setState(() {});
          },
        ),
      ),
      body: _searchController.text.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.search,
                    size: 64,
                    color: Colors.grey.withOpacity(0.3),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Start typing to search',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          opacity: 0.6,
                    ),
                  ),
                ],
              ),
            )
          : ListView(
              padding: const EdgeInsets.all(16),
              children: [
                Text(
                  'Search Results',
                  style: Theme.of(context).textTheme.headlineSmall,
                ),
                const SizedBox(height: 16),
                ListTile(
                  title: const Text('Result 1'),
                  subtitle: const Text('From Quran'),
                  onTap: () {},
                ),
                ListTile(
                  title: const Text('Result 2'),
                  subtitle: const Text('From Hadith'),
                  onTap: () {},
                ),
                ListTile(
                  title: const Text('Result 3'),
                  subtitle: const Text('From Duas'),
                  onTap: () {},
                ),
              ],
            ),
    );
  }
}
