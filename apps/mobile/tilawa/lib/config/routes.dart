import 'package:go_router/go_router.dart';
import '../screens/index.dart';

final appRouter = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: '/onboarding',
      builder: (context, state) => const OnboardingScreen(),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/register',
      builder: (context, state) => const RegisterScreen(),
    ),
    GoRoute(
      path: '/home',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: '/quran',
      builder: (context, state) => const QuranScreen(),
      routes: [
        GoRoute(
          path: 'surah/:number',
          builder: (context, state) {
            final surahNumber = int.parse(state.pathParameters['number'] ?? '1');
            return SurahDetailScreen(surahNumber: surahNumber);
          },
        ),
      ],
    ),
    GoRoute(
      path: '/hadith',
      builder: (context, state) => const HadithScreen(),
      routes: [
        GoRoute(
          path: 'collection/:id',
          builder: (context, state) {
            final collectionId = state.pathParameters['id'] ?? '';
            return HadithDetailScreen(collectionId: collectionId);
          },
        ),
      ],
    ),
    GoRoute(
      path: '/dua',
      builder: (context, state) => const DuaScreen(),
    ),
    GoRoute(
      path: '/hifz',
      builder: (context, state) => const HifzScreen(),
    ),
    GoRoute(
      path: '/profile',
      builder: (context, state) => const ProfileScreen(),
    ),
    GoRoute(
      path: '/settings',
      builder: (context, state) => const SettingsScreen(),
    ),
    GoRoute(
      path: '/search',
      builder: (context, state) => const SearchScreen(),
    ),
  ],
);
