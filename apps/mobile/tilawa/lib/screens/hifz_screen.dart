import 'package:flutter/material.dart';

class HifzScreen extends StatelessWidget {
  const HifzScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Memorization (Hifz)')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Current Deck', style: Theme.of(context).textTheme.headlineSmall),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Surahs Memorized: 2'),
                      Text('${(2 / 114 * 100).toStringAsFixed(1)}%'),
                    ],
                  ),
                  const SizedBox(height: 8),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(4),
                    child: LinearProgressIndicator(
                      value: 2 / 114,
                      minHeight: 8,
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {},
            child: const Text('Start Review'),
          ),
          const SizedBox(height: 16),
          Card(
            child: ListTile(
              title: const Text('Surah Al-Fatihah'),
              subtitle: const Text('Review in 2 days'),
              trailing: const Icon(Icons.arrow_forward),
              onTap: () {},
            ),
          ),
          Card(
            child: ListTile(
              title: const Text('Surah Al-Ikhlas'),
              subtitle: const Text('Review in 5 days'),
              trailing: const Icon(Icons.arrow_forward),
              onTap: () {},
            ),
          ),
        ],
      ),
    );
  }
}
