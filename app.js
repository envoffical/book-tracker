/**
 * The Midnight Library — Elite Production-Grade Client-Side Book Tracker
 * Specifications:
 * - Dynamic Light/Dark Theme Switcher with localStorage persistence
 * - Cinematic Netflix-style splash with golden glow reveal & 12s auto-timer
 * - Integrated editorial briefing card on splash overlay
 * - Pre-loaded massive dataset of 120 diverse, real-world classic and modern volumes
 * - Complete page tracking with animated percentage progress bars
 * - Interactive 1-to-5 star ratings & literary review reflections
 * - Full JSON backup (Export & Import) with integrity validation
 * - Random "Surprise Me" roulette picker for unread books
 * - Instant case-insensitive search & category filter pills
 * - Strict inline error validation and newest-first unshift ordering
 * - Smooth cubic-bezier fade-out deletion transitions
 * - Live aggregate metrics (volumes, statuses, and total pages read)
 * - Mobile-first responsiveness across all viewports
 */

(function () {
  'use strict';

  // --- Constants & Storage Keys ---
  const STORAGE_KEY = 'midnight_library_books_v3';
  const INTRO_SEEN_KEY = 'midnight_intro_seen_v3';
  const THEME_KEY = 'midnight_library_theme';

  // --- 120 Realistic Curated Volumes (Classics, Philosophy, Sci-Fi, Tech, Dystopian) ---
  const CURATED_120_BOOKS = [
    { id: 1718000000120, title: "The Midnight Library", author: "Matt Haig", status: "Finished", genre: "Fiction", currentPage: 304, totalPages: 304, rating: 5, notes: "A touching exploration of infinite regrets and potential lives.", createdAt: "10/14/2026" },
    { id: 1718000000119, title: "Klara and the Sun", author: "Kazuo Ishiguro", status: "Reading", genre: "Sci-Fi & Philosophy", currentPage: 185, totalPages: 320, rating: 4, notes: "Sublime exploration of love through an artificial friend's eyes.", createdAt: "10/14/2026" },
    { id: 1718000000118, title: "Project Hail Mary", author: "Andy Weir", status: "To read", genre: "Sci-Fi & Fantasy", currentPage: 0, totalPages: 496, rating: 0, notes: "", createdAt: "10/13/2026" },
    { id: 1718000000117, title: "1984", author: "George Orwell", status: "Finished", genre: "Dystopian", currentPage: 328, totalPages: 328, rating: 5, notes: "War is peace. Freedom is slavery. Ignorance is strength.", createdAt: "10/13/2026" },
    { id: 1718000000116, title: "Brave New World", author: "Aldous Huxley", status: "Finished", genre: "Dystopian", currentPage: 288, totalPages: 288, rating: 5, notes: "A chilling warning on technological hedonism and state conditioning.", createdAt: "10/12/2026" },
    { id: 1718000000115, title: "Fahrenheit 451", author: "Ray Bradbury", status: "Finished", genre: "Dystopian", currentPage: 249, totalPages: 249, rating: 5, notes: "A book is a loaded gun in the house next door. Burn it.", createdAt: "10/12/2026" },
    { id: 1718000000114, title: "Dune", author: "Frank Herbert", status: "Finished", genre: "Sci-Fi & Fantasy", currentPage: 688, totalPages: 688, rating: 5, notes: "Fear is the mind-killer. The definitive sci-fi epic.", createdAt: "10/11/2026" },
    { id: 1718000000113, title: "Neuromancer", author: "William Gibson", status: "Reading", genre: "Sci-Fi & Fantasy", currentPage: 210, totalPages: 292, rating: 4, notes: "The sky above the port was the color of television, tuned to a dead channel.", createdAt: "10/11/2026" },
    { id: 1718000000112, title: "Snow Crash", author: "Neal Stephenson", status: "To read", genre: "Sci-Fi & Fantasy", currentPage: 0, totalPages: 480, rating: 0, notes: "", createdAt: "10/10/2026" },
    { id: 1718000000111, title: "Foundation", author: "Isaac Asimov", status: "Finished", genre: "Sci-Fi & Fantasy", currentPage: 255, totalPages: 255, rating: 4, notes: "Psychohistory and the mathematics of human civilizations.", createdAt: "10/10/2026" },
    { id: 1718000000110, title: "The Three-Body Problem", author: "Cixin Liu", status: "Reading", genre: "Sci-Fi & Fantasy", currentPage: 260, totalPages: 400, rating: 5, notes: "Unprecedented cosmic scale and theoretical physics mystery.", createdAt: "10/09/2026" },
    { id: 1718000000109, title: "Do Androids Dream of Electric Sheep?", author: "Philip K. Dick", status: "Finished", genre: "Sci-Fi & Fantasy", currentPage: 240, totalPages: 240, rating: 4, notes: "What defines humanity in an artificial epoch?", createdAt: "10/09/2026" },
    { id: 1718000000108, title: "Hyperion", author: "Dan Simmons", status: "To read", genre: "Sci-Fi & Fantasy", currentPage: 0, totalPages: 500, rating: 0, notes: "", createdAt: "10/08/2026" },
    { id: 1718000000107, title: "Solaris", author: "Stanislaw Lem", status: "To read", genre: "Sci-Fi & Fantasy", currentPage: 0, totalPages: 224, rating: 0, notes: "", createdAt: "10/08/2026" },
    { id: 1718000000106, title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", status: "Reading", genre: "Sci-Fi & Fantasy", currentPage: 140, totalPages: 304, rating: 4, notes: "Groundbreaking anthropology and duality on Gethen.", createdAt: "10/07/2026" },
    { id: 1718000000105, title: "Meditations", author: "Marcus Aurelius", status: "Finished", genre: "Philosophy", currentPage: 256, totalPages: 256, rating: 5, notes: "You have power over your mind - not outside events. Realize this, and you will find strength.", createdAt: "10/07/2026" },
    { id: 1718000000104, title: "Letters from a Stoic", author: "Seneca", status: "Finished", genre: "Philosophy", currentPage: 320, totalPages: 320, rating: 5, notes: "Timeless epistolary wisdom on time, death, and friendship.", createdAt: "10/06/2026" },
    { id: 1718000000103, title: "The Myth of Sisyphus", author: "Albert Camus", status: "Finished", genre: "Philosophy", currentPage: 160, totalPages: 160, rating: 5, notes: "One must imagine Sisyphus happy. Absurdism at its peak.", createdAt: "10/06/2026" },
    { id: 1718000000102, title: "The Stranger", author: "Albert Camus", status: "Finished", genre: "Philosophy", currentPage: 123, totalPages: 123, rating: 4, notes: "Mother died today. Or maybe yesterday, I can't be sure.", createdAt: "10/05/2026" },
    { id: 1718000000101, title: "Beyond Good and Evil", author: "Friedrich Nietzsche", status: "Reading", genre: "Philosophy", currentPage: 110, totalPages: 240, rating: 4, notes: "He who fights with monsters should look to it that he himself does not become a monster.", createdAt: "10/05/2026" },
    { id: 1718000000100, title: "Thus Spoke Zarathustra", author: "Friedrich Nietzsche", status: "To read", genre: "Philosophy", currentPage: 0, totalPages: 352, rating: 0, notes: "", createdAt: "10/04/2026" },
    { id: 1718000000099, title: "The Republic", author: "Plato", status: "Finished", genre: "Philosophy", currentPage: 416, totalPages: 416, rating: 5, notes: "The allegory of the cave and the search for ideal justice.", createdAt: "10/04/2026" },
    { id: 1718000000098, title: "Man's Search for Meaning", author: "Viktor E. Frankl", status: "Finished", genre: "Psychology", currentPage: 165, totalPages: 165, rating: 5, notes: "Those who have a 'why' to live, can bear with almost any 'how'.", createdAt: "10/03/2026" },
    { id: 1718000000097, title: "Tao Te Ching", author: "Lao Tzu", status: "Finished", genre: "Philosophy", currentPage: 128, totalPages: 128, rating: 5, notes: "Simplicity, patience, and non-action (Wu Wei).", createdAt: "10/03/2026" },
    { id: 1718000000096, title: "Critique of Pure Reason", author: "Immanuel Kant", status: "To read", genre: "Philosophy", currentPage: 0, totalPages: 784, rating: 0, notes: "", createdAt: "10/02/2026" },
    { id: 1718000000095, title: "Being and Time", author: "Martin Heidegger", status: "To read", genre: "Philosophy", currentPage: 0, totalPages: 589, rating: 0, notes: "", createdAt: "10/02/2026" },
    { id: 1718000000094, title: "The Art of War", author: "Sun Tzu", status: "Finished", genre: "Philosophy", currentPage: 112, totalPages: 112, rating: 4, notes: "Supreme excellence consists of breaking the enemy's resistance without fighting.", createdAt: "10/01/2026" },
    { id: 1718000000093, title: "Nicomachean Ethics", author: "Aristotle", status: "To read", genre: "Philosophy", currentPage: 0, totalPages: 350, rating: 0, notes: "", createdAt: "10/01/2026" },
    { id: 1718000000092, title: "Discourse on Method", author: "René Descartes", status: "Finished", genre: "Philosophy", currentPage: 128, totalPages: 128, rating: 4, notes: "Cogito, ergo sum.", createdAt: "09/30/2026" },
    { id: 1718000000091, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", status: "Reading", genre: "Technology & Code", currentPage: 412, totalPages: 616, rating: 5, notes: "The undisputed bible of distributed systems, storage engines, and consensus.", createdAt: "09/30/2026" },
    { id: 1718000000090, title: "Structure and Interpretation of Computer Programs", author: "Harold Abelson", status: "To read", genre: "Technology & Code", currentPage: 0, totalPages: 657, rating: 0, notes: "", createdAt: "09/29/2026" },
    { id: 1718000000089, title: "Clean Code", author: "Robert C. Martin", status: "Finished", genre: "Technology & Code", currentPage: 464, totalPages: 464, rating: 4, notes: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", createdAt: "09/29/2026" },
    { id: 1718000000088, title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", status: "Finished", genre: "Technology & Code", currentPage: 352, totalPages: 352, rating: 5, notes: "Care about your craft. Provide options, don't make excuses.", createdAt: "09/28/2026" },
    { id: 1718000000087, title: "Code: The Hidden Language of Computer Hardware", author: "Charles Petzold", status: "Finished", genre: "Technology & Code", currentPage: 400, totalPages: 400, rating: 5, notes: "A genius mechanical progression from flashlight circuits to microprocessor architecture.", createdAt: "09/28/2026" },
    { id: 1718000000086, title: "Gödel, Escher, Bach", author: "Douglas Hofstadter", status: "Reading", genre: "Technology & Code", currentPage: 345, totalPages: 777, rating: 5, notes: "Self-reference, recursion, and the emergence of human consciousness.", createdAt: "09/27/2026" },
    { id: 1718000000085, title: "The Mythical Man-Month", author: "Frederick P. Brooks Jr.", status: "Finished", genre: "Technology & Code", currentPage: 336, totalPages: 336, rating: 4, notes: "Adding manpower to a late software project makes it later.", createdAt: "09/27/2026" },
    { id: 1718000000084, title: "Algorithms to Live By", author: "Brian Christian & Tom Griffiths", status: "Finished", genre: "Technology & Code", currentPage: 368, totalPages: 368, rating: 5, notes: "Optimal stopping, caching, and game theory applied to daily human decision-making.", createdAt: "09/26/2026" },
    { id: 1718000000083, title: "Refactoring: Improving Existing Code", author: "Martin Fowler", status: "Reading", genre: "Technology & Code", currentPage: 220, totalPages: 448, rating: 4, notes: "Improving internal code structure without altering external behavior.", createdAt: "09/26/2026" },
    { id: 1718000000082, title: "Design Patterns: Gang of Four", author: "Erich Gamma et al.", status: "Finished", genre: "Technology & Code", currentPage: 416, totalPages: 416, rating: 4, notes: "Foundational catalog of reusable object-oriented patterns.", createdAt: "09/25/2026" },
    { id: 1718000000081, title: "High Performance Browser Networking", author: "Ilya Grigorik", status: "To read", genre: "Technology & Code", currentPage: 0, totalPages: 400, rating: 0, notes: "", createdAt: "09/25/2026" },
    { id: 1718000000080, title: "Domain-Driven Design", author: "Eric Evans", status: "To read", genre: "Technology & Code", currentPage: 0, totalPages: 560, rating: 0, notes: "", createdAt: "09/24/2026" },
    { id: 1718000000079, title: "Chip War", author: "Chris Miller", status: "Finished", genre: "Technology & Code", currentPage: 464, totalPages: 464, rating: 5, notes: "Microchips are the new oil — the geopolitical epicenter of computation.", createdAt: "09/24/2026" },
    { id: 1718000000078, title: "The Innovators", author: "Walter Isaacson", status: "Finished", genre: "Technology & Code", currentPage: 560, totalPages: 560, rating: 4, notes: "How a group of hackers, geniuses, and geeks created the digital revolution.", createdAt: "09/23/2026" },
    { id: 1718000000077, title: "Steve Jobs", author: "Walter Isaacson", status: "Finished", genre: "Biography", currentPage: 656, totalPages: 656, rating: 5, notes: "The intersection of humanities, design, and uncompromising engineering.", createdAt: "09/23/2026" },
    { id: 1718000000076, title: "Crime and Punishment", author: "Fyodor Dostoevsky", status: "Finished", genre: "Classic Literature", currentPage: 545, totalPages: 545, rating: 5, notes: "Raskolnikov's psychological torment and moral resurrection.", createdAt: "09/22/2026" },
    { id: 1718000000075, title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", status: "Reading", genre: "Classic Literature", currentPage: 410, totalPages: 796, rating: 5, notes: "The Grand Inquisitor, moral freedom, and existential faith.", createdAt: "09/22/2026" },
    { id: 1718000000074, title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", status: "Finished", genre: "Fiction", currentPage: 417, totalPages: 417, rating: 5, notes: "Magical realism at Macondo through seven generations of Buendías.", createdAt: "09/21/2026" },
    { id: 1718000000073, title: "The Great Gatsby", author: "F. Scott Fitzgerald", status: "Finished", genre: "Classic Literature", currentPage: 180, totalPages: 180, rating: 4, notes: "So we beat on, boats against the current, borne back ceaselessly into the past.", createdAt: "09/21/2026" },
    { id: 1718000000072, title: "To Kill a Mockingbird", author: "Harper Lee", status: "Finished", genre: "Classic Literature", currentPage: 336, totalPages: 336, rating: 5, notes: "You never really understand a person until you consider things from his point of view.", createdAt: "09/20/2026" },
    { id: 1718000000071, title: "The Picture of Dorian Gray", author: "Oscar Wilde", status: "Finished", genre: "Classic Literature", currentPage: 272, totalPages: 272, rating: 5, notes: "The only way to get rid of temptation is to yield to it.", createdAt: "09/20/2026" },
    { id: 1718000000070, title: "The Metamorphosis", author: "Franz Kafka", status: "Finished", genre: "Classic Literature", currentPage: 100, totalPages: 100, rating: 4, notes: "Gregor Samsa woke up transformed in his bed into a monstrous insect.", createdAt: "09/19/2026" },
    { id: 1718000000069, title: "The Trial", author: "Franz Kafka", status: "Reading", genre: "Classic Literature", currentPage: 140, totalPages: 255, rating: 4, notes: "Someone must have slandered Josef K., for one morning he was arrested.", createdAt: "09/19/2026" },
    { id: 1718000000068, title: "The Master and Margarita", author: "Mikhail Bulgakov", status: "Finished", genre: "Fiction", currentPage: 412, totalPages: 412, rating: 5, notes: "Manuscripts don't burn. Satan's visit to Soviet Moscow.", createdAt: "09/18/2026" },
    { id: 1718000000067, title: "Anna Karenina", author: "Leo Tolstoy", status: "To read", genre: "Classic Literature", currentPage: 0, totalPages: 864, rating: 0, notes: "", createdAt: "09/18/2026" },
    { id: 1718000000066, title: "War and Peace", author: "Leo Tolstoy", status: "To read", genre: "Classic Literature", currentPage: 0, totalPages: 1225, rating: 0, notes: "", createdAt: "09/17/2026" },
    { id: 1718000000065, title: "Don Quixote", author: "Miguel de Cervantes", status: "Finished", genre: "Classic Literature", currentPage: 992, totalPages: 992, rating: 5, notes: "The founding father of the modern Western novel.", createdAt: "09/17/2026" },
    { id: 1718000000064, title: "The Count of Monte Cristo", author: "Alexandre Dumas", status: "Finished", genre: "Classic Literature", currentPage: 1276, totalPages: 1276, rating: 5, notes: "Wait and hope. The ultimate chronicle of patience and vengeance.", createdAt: "09/16/2026" },
    { id: 1718000000063, title: "Les Misérables", author: "Victor Hugo", status: "To read", genre: "Classic Literature", currentPage: 0, totalPages: 1463, rating: 0, notes: "", createdAt: "09/16/2026" },
    { id: 1718000000062, title: "Jane Eyre", author: "Charlotte Brontë", status: "Finished", genre: "Classic Literature", currentPage: 532, totalPages: 532, rating: 5, notes: "I am no bird; and no net ensnares me.", createdAt: "09/15/2026" },
    { id: 1718000000061, title: "Wuthering Heights", author: "Emily Brontë", status: "Finished", genre: "Classic Literature", currentPage: 416, totalPages: 416, rating: 4, notes: "Whatever our souls are made of, his and mine are the same.", createdAt: "09/15/2026" },
    { id: 1718000000060, title: "Pride and Prejudice", author: "Jane Austen", status: "Finished", genre: "Classic Literature", currentPage: 432, totalPages: 432, rating: 5, notes: "It is a truth universally acknowledged...", createdAt: "09/14/2026" },
    { id: 1718000000059, title: "The Catcher in the Rye", author: "J.D. Salinger", status: "Finished", genre: "Fiction", currentPage: 277, totalPages: 277, rating: 4, notes: "Holden Caulfield's eternal adolescence and search for authenticity.", createdAt: "09/14/2026" },
    { id: 1718000000058, title: "Sapiens", author: "Yuval Noah Harari", status: "Finished", genre: "Non-Fiction", currentPage: 464, totalPages: 464, rating: 5, notes: "How fiction and shared myths allowed Homo sapiens to rule the globe.", createdAt: "09/13/2026" },
    { id: 1718000000057, title: "Homo Deus", author: "Yuval Noah Harari", status: "Finished", genre: "Non-Fiction", currentPage: 448, totalPages: 448, rating: 4, notes: "The future of human enhancement, artificial intelligence, and algorithms.", createdAt: "09/13/2026" },
    { id: 1718000000056, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", status: "Reading", genre: "Psychology", currentPage: 280, totalPages: 499, rating: 5, notes: "System 1 vs System 2 cognitive architecture and cognitive biases.", createdAt: "09/12/2026" },
    { id: 1718000000055, title: "Atomic Habits", author: "James Clear", status: "Finished", genre: "Non-Fiction", currentPage: 320, totalPages: 320, rating: 5, notes: "You do not rise to the level of your goals. You fall to the level of your systems.", createdAt: "09/12/2026" },
    { id: 1718000000054, title: "Deep Work", author: "Cal Newport", status: "Finished", genre: "Non-Fiction", currentPage: 304, totalPages: 304, rating: 5, notes: "Distraction-free focus is the superpower of the knowledge economy.", createdAt: "09/11/2026" },
    { id: 1718000000053, title: "Zero to One", author: "Peter Thiel", status: "Finished", genre: "Technology & Code", currentPage: 224, totalPages: 224, rating: 4, notes: "Doing what we already know how to do takes the world from 1 to n.", createdAt: "09/11/2026" },
    { id: 1718000000052, title: "A Gentleman in Moscow", author: "Amor Towles", status: "Finished", genre: "Fiction", currentPage: 462, totalPages: 462, rating: 5, notes: "Count Rostov's aristocratic resilience inside the Metropol hotel.", createdAt: "09/10/2026" },
    { id: 1718000000051, title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", status: "Reading", genre: "Fiction", currentPage: 195, totalPages: 416, rating: 4, notes: "Game design, creative collaboration, and lifelong friendship.", createdAt: "09/10/2026" },
    { id: 1718000000050, title: "Piranesi", author: "Susanna Clarke", status: "Finished", genre: "Sci-Fi & Fantasy", currentPage: 272, totalPages: 272, rating: 5, notes: "The Beauty of the House is immeasurable; its Kindness infinite.", createdAt: "09/09/2026" },
    { id: 1718000000049, title: "Circe", author: "Madeline Miller", status: "Finished", genre: "Fiction", currentPage: 400, totalPages: 400, rating: 5, notes: "A luminous mythological re-imagining of female autonomy.", createdAt: "09/09/2026" },
    { id: 1718000000048, title: "The Song of Achilles", author: "Madeline Miller", status: "Finished", genre: "Fiction", currentPage: 378, totalPages: 378, rating: 5, notes: "I could recognize him by touch alone, by smell; I would know him blind.", createdAt: "09/08/2026" },
    { id: 1718000000047, title: "Pachinko", author: "Min Jin Lee", status: "Finished", genre: "Fiction", currentPage: 496, totalPages: 496, rating: 5, notes: "History has failed us, but no matter. A grand family saga.", createdAt: "09/08/2026" },
    { id: 1718000000046, title: "Station Eleven", author: "Emily St. John Mandel", status: "Reading", genre: "Dystopian", currentPage: 160, totalPages: 352, rating: 4, notes: "Survival is insufficient.", createdAt: "09/07/2026" },
    { id: 1718000000045, title: "The Overstory", author: "Richard Powers", status: "To read", genre: "Fiction", currentPage: 0, totalPages: 502, rating: 0, notes: "", createdAt: "09/07/2026" },
    { id: 1718000000044, title: "Educated", author: "Tara Westover", status: "Finished", genre: "Biography", currentPage: 352, totalPages: 352, rating: 5, notes: "An extraordinary memoir of self-invention through literature and study.", createdAt: "09/06/2026" },
    { id: 1718000000043, title: "When Breath Becomes Air", author: "Paul Kalanithi", status: "Finished", genre: "Biography", currentPage: 228, totalPages: 228, rating: 5, notes: "What makes life meaningful enough to go on living?", createdAt: "09/06/2026" },
    { id: 1718000000042, title: "Bad Blood", author: "John Carreyrou", status: "Finished", genre: "Non-Fiction", currentPage: 352, totalPages: 352, rating: 4, notes: "The unbelievable unraveling of Elizabeth Holmes and Theranos.", createdAt: "09/05/2026" },
    { id: 1718000000041, title: "Siddhartha", author: "Hermann Hesse", status: "Finished", genre: "Philosophy", currentPage: 152, totalPages: 152, rating: 5, notes: "Wisdom cannot be imparted. Wisdom that a wise man attempts to impart always sounds like foolishness.", createdAt: "09/05/2026" },
    { id: 1718000000040, title: "Steppenwolf", author: "Hermann Hesse", status: "To read", genre: "Fiction", currentPage: 0, totalPages: 256, rating: 0, notes: "", createdAt: "09/04/2026" },
    { id: 1718000000039, title: "Animal Farm", author: "George Orwell", status: "Finished", genre: "Dystopian", currentPage: 140, totalPages: 140, rating: 5, notes: "All animals are equal, but some animals are more equal than others.", createdAt: "09/04/2026" },
    { id: 1718000000038, title: "The Handmaid's Tale", author: "Margaret Atwood", status: "Reading", genre: "Dystopian", currentPage: 180, totalPages: 311, rating: 4, notes: "Nolite te bastardes carborundorum.", createdAt: "09/03/2026" },
    { id: 1718000000037, title: "The Road", author: "Cormac McCarthy", status: "Finished", genre: "Dystopian", currentPage: 287, totalPages: 287, rating: 5, notes: "Carrying the fire across a post-apocalyptic ash wasteland.", createdAt: "09/03/2026" },
    { id: 1718000000036, title: "Blood Meridian", author: "Cormac McCarthy", status: "To read", genre: "Fiction", currentPage: 0, totalPages: 351, rating: 0, notes: "", createdAt: "09/02/2026" },
    { id: 1718000000035, title: "Slaughterhouse-Five", author: "Kurt Vonnegut", status: "Finished", genre: "Sci-Fi & Fantasy", currentPage: 275, totalPages: 275, rating: 5, notes: "So it goes. Unstuck in time.", createdAt: "09/02/2026" },
    { id: 1718000000034, title: "Cat's Cradle", author: "Kurt Vonnegut", status: "Reading", genre: "Fiction", currentPage: 110, totalPages: 287, rating: 4, notes: "Ice-nine and the Church of Bokonon.", createdAt: "09/01/2026" },
    { id: 1718000000033, title: "Contact", author: "Carl Sagan", status: "Finished", genre: "Sci-Fi & Fantasy", currentPage: 432, totalPages: 432, rating: 5, notes: "For small creatures such as we, the vastness is bearable only through love.", createdAt: "09/01/2026" },
    { id: 1718000000032, title: "Cosmos", author: "Carl Sagan", status: "Finished", genre: "Non-Fiction", currentPage: 384, totalPages: 384, rating: 5, notes: "We are a way for the cosmos to know itself.", createdAt: "08/31/2026" },
    { id: 1718000000031, title: "Rendezvous with Rama", author: "Arthur C. Clarke", status: "To read", genre: "Sci-Fi & Fantasy", currentPage: 0, totalPages: 256, rating: 0, notes: "", createdAt: "08/31/2026" },
    { id: 1718000000030, title: "2001: A Space Odyssey", author: "Arthur C. Clarke", status: "Finished", genre: "Sci-Fi & Fantasy", currentPage: 297, totalPages: 297, rating: 5, notes: "The monolith and the evolution of intelligence.", createdAt: "08/30/2026" },
    { id: 1718000000029, title: "Childhood's End", author: "Arthur C. Clarke", status: "To read", genre: "Sci-Fi & Fantasy", currentPage: 0, totalPages: 224, rating: 0, notes: "", createdAt: "08/30/2026" },
    { id: 1718000000028, title: "I, Robot", author: "Isaac Asimov", status: "Finished", genre: "Sci-Fi & Fantasy", currentPage: 256, totalPages: 256, rating: 4, notes: "The Three Laws of Robotics and ethical machines.", createdAt: "08/29/2026" },
    { id: 1718000000027, title: "Never Let Me Go", author: "Kazuo Ishiguro", status: "Finished", genre: "Dystopian", currentPage: 288, totalPages: 288, rating: 5, notes: "A quiet, devastating masterpiece on human obsolescence.", createdAt: "08/29/2026" },
    { id: 1718000000026, title: "The Remains of the Day", author: "Kazuo Ishiguro", status: "Finished", genre: "Fiction", currentPage: 258, totalPages: 258, rating: 5, notes: "Stevens the butler and the profound tragedy of suppressed feeling.", createdAt: "08/28/2026" },
    { id: 1718000000025, title: "Norwegian Wood", author: "Haruki Murakami", status: "Finished", genre: "Fiction", currentPage: 296, totalPages: 296, rating: 4, notes: "Nostalgia, grief, and budding love in 1960s Tokyo.", createdAt: "08/28/2026" },
    { id: 1718000000024, title: "Kafka on the Shore", author: "Haruki Murakami", status: "Reading", genre: "Fiction", currentPage: 280, totalPages: 505, rating: 4, notes: "Fish raining from the sky and conversations with cats.", createdAt: "08/27/2026" },
    { id: 1718000000023, title: "1Q84", author: "Haruki Murakami", status: "To read", genre: "Fiction", currentPage: 0, totalPages: 928, rating: 0, notes: "", createdAt: "08/27/2026" },
    { id: 1718000000022, title: "The Sound and the Fury", author: "William Faulkner", status: "To read", genre: "Classic Literature", currentPage: 0, totalPages: 326, rating: 0, notes: "", createdAt: "08/26/2026" },
    { id: 1718000000021, title: "As I Lay Dying", author: "William Faulkner", status: "To read", genre: "Classic Literature", currentPage: 0, totalPages: 267, rating: 0, notes: "", createdAt: "08/26/2026" },
    { id: 1718000000020, title: "Moby-Dick", author: "Herman Melville", status: "Finished", genre: "Classic Literature", currentPage: 635, totalPages: 635, rating: 4, notes: "Call me Ishmael. The obsession of Ahab.", createdAt: "08/25/2026" },
    { id: 1718000000019, title: "The Old Man and the Sea", author: "Ernest Hemingway", status: "Finished", genre: "Classic Literature", currentPage: 127, totalPages: 127, rating: 5, notes: "Man is not made for defeat. A man can be destroyed but not defeated.", createdAt: "08/25/2026" },
    { id: 1718000000018, title: "For Whom the Bell Tolls", author: "Ernest Hemingway", status: "To read", genre: "Classic Literature", currentPage: 0, totalPages: 471, rating: 0, notes: "", createdAt: "08/24/2026" },
    { id: 1718000000017, title: "East of Eden", author: "John Steinbeck", status: "Finished", genre: "Classic Literature", currentPage: 601, totalPages: 601, rating: 5, notes: "Timshel — thou mayest rule over sin.", createdAt: "08/24/2026" },
    { id: 1718000000016, title: "The Grapes of Wrath", author: "John Steinbeck", status: "To read", genre: "Classic Literature", currentPage: 0, totalPages: 464, rating: 0, notes: "", createdAt: "08/23/2026" },
    { id: 1718000000015, title: "Of Mice and Men", author: "John Steinbeck", status: "Finished", genre: "Classic Literature", currentPage: 107, totalPages: 107, rating: 5, notes: "The best-laid schemes o' mice an' men gang aft agley.", createdAt: "08/23/2026" },
    { id: 1718000000014, title: "In Search of Lost Time", author: "Marcel Proust", status: "To read", genre: "Classic Literature", currentPage: 0, totalPages: 4215, rating: 0, notes: "", createdAt: "08/22/2026" },
    { id: 1718000000013, title: "Madame Bovary", author: "Gustave Flaubert", status: "Finished", genre: "Classic Literature", currentPage: 329, totalPages: 329, rating: 4, notes: "The tragedy of romantic illusion versus mundane reality.", createdAt: "08/22/2026" },
    { id: 1718000000012, title: "The Sun Also Rises", author: "Ernest Hemingway", status: "Finished", genre: "Classic Literature", currentPage: 251, totalPages: 251, rating: 4, notes: "The Lost Generation in Paris and Pamplona.", createdAt: "08/21/2026" },
    { id: 1718000000011, title: "Heart of Darkness", author: "Joseph Conrad", status: "Finished", genre: "Classic Literature", currentPage: 116, totalPages: 116, rating: 4, notes: "The horror! The horror!", createdAt: "08/21/2026" },
    { id: 1718000000010, title: "Beloved", author: "Toni Morrison", status: "Finished", genre: "Fiction", currentPage: 324, totalPages: 324, rating: 5, notes: "A monument of American literature and historical memory.", createdAt: "08/20/2026" },
    { id: 1718000000009, title: "Song of Solomon", author: "Toni Morrison", status: "To read", genre: "Fiction", currentPage: 0, totalPages: 337, rating: 0, notes: "", createdAt: "08/20/2026" },
    { id: 1718000000008, title: "The Bell Jar", author: "Sylvia Plath", status: "Finished", genre: "Fiction", currentPage: 244, totalPages: 244, rating: 5, notes: "I took a deep breath and listened to the old brag of my heart: I am, I am, I am.", createdAt: "08/19/2026" },
    { id: 1718000000007, title: "A Room of One's Own", author: "Virginia Woolf", status: "Finished", genre: "Philosophy", currentPage: 112, totalPages: 112, rating: 5, notes: "A woman must have money and a room of her own if she is to write fiction.", createdAt: "08/19/2026" },
    { id: 1718000000006, title: "To the Lighthouse", author: "Virginia Woolf", status: "Reading", genre: "Classic Literature", currentPage: 85, totalPages: 209, rating: 4, notes: "Stream of consciousness and the passage of temporal life.", createdAt: "08/18/2026" },
    { id: 1718000000005, title: "Mrs Dalloway", author: "Virginia Woolf", status: "Finished", genre: "Classic Literature", currentPage: 194, totalPages: 194, rating: 4, notes: "Mrs. Dalloway said she would buy the flowers herself.", createdAt: "08/18/2026" },
    { id: 1718000000004, title: "Ulysses", author: "James Joyce", status: "To read", genre: "Classic Literature", currentPage: 0, totalPages: 730, rating: 0, notes: "", createdAt: "08/17/2026" },
    { id: 1718000000003, title: "Dubliners", author: "James Joyce", status: "Finished", genre: "Classic Literature", currentPage: 160, totalPages: 160, rating: 5, notes: "The dead are falling faintly through the universe.", createdAt: "08/17/2026" },
    { id: 1718000000002, title: "A Portrait of the Artist as a Young Man", author: "James Joyce", status: "To read", genre: "Classic Literature", currentPage: 0, totalPages: 299, rating: 0, notes: "", createdAt: "08/16/2026" },
    { id: 1718000000001, title: "The Divine Comedy", author: "Dante Alighieri", status: "Finished", genre: "Classic Literature", currentPage: 798, totalPages: 798, rating: 5, notes: "Abandon all hope, ye who enter here. The journey through Inferno, Purgatorio, and Paradiso.", createdAt: "08/16/2026" }
  ];

  // --- State ---
  let books = [];
  let currentTheme = 'dark';
  let currentSearchQuery = '';
  let currentStatusFilter = 'All';
  let currentSortBy = 'newest';
  let currentPage = 1;
  let itemsPerPage = 24;
  let activeEditingNoteBookId = null;
  let introCountdownInterval = null;

  // --- DOM Elements ---
  const cinematicIntro = document.getElementById('cinematic-intro');
  const enterLibraryBtn = document.getElementById('enter-library-btn');
  const introTimerSeconds = document.getElementById('intro-timer-seconds');
  const replayIntroBtn = document.getElementById('replay-intro-btn');

  // Theme Toggles
  const themeToggleDesktop = document.getElementById('theme-toggle-btn-desktop');
  const themeToggleMobile = document.getElementById('theme-toggle-btn-mobile');

  // Forms
  const bookForm = document.getElementById('book-form');
  const titleInput = document.getElementById('book-title');
  const authorInput = document.getElementById('book-author');
  const statusInput = document.getElementById('book-status');
  const genreInput = document.getElementById('book-genre');
  const currentPageInput = document.getElementById('book-current-page');
  const totalPagesInput = document.getElementById('book-total-pages');
  const notesInput = document.getElementById('book-notes');
  const titleError = document.getElementById('title-error');
  const authorError = document.getElementById('author-error');

  const bookModal = document.getElementById('book-modal');
  const headerAddBookBtn = document.getElementById('header-add-book-btn');
  const mobileAddBtn = document.getElementById('mobile-add-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalBookForm = document.getElementById('modal-book-form');
  const modalTitleInput = document.getElementById('modal-book-title');
  const modalAuthorInput = document.getElementById('modal-book-author');
  const modalStatusInput = document.getElementById('modal-book-status');
  const modalGenreInput = document.getElementById('modal-book-genre');
  const modalCurrentPageInput = document.getElementById('modal-book-current-page');
  const modalTotalPagesInput = document.getElementById('modal-book-total-pages');
  const modalTitleError = document.getElementById('modal-title-error');
  const modalAuthorError = document.getElementById('modal-author-error');

  // Search & Catalog
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const filterPillsContainer = document.getElementById('filter-pills');
  const sortSelect = document.getElementById('sort-select');
  const booksContainer = document.getElementById('books-container');
  const emptyState = document.getElementById('empty-state');
  const emptyStateTitle = document.getElementById('empty-state-title');
  const emptyStateDesc = document.getElementById('empty-state-desc');
  const emptyActionBtn = document.getElementById('empty-action-btn');
  const liveMetricsChip = document.getElementById('live-metrics-chip');
  const resultsCount = document.getElementById('results-count');
  const pageIndicator = document.getElementById('page-indicator');
  const resetSampleBtn = document.getElementById('reset-sample-btn');

  // Pagination
  const paginationControls = document.getElementById('pagination-controls');
  const itemsPerPageSelect = document.getElementById('items-per-page');
  const prevPageBtn = document.getElementById('prev-page-btn');
  const nextPageBtn = document.getElementById('next-page-btn');
  const pageNumbersContainer = document.getElementById('page-numbers');

  // Modals
  const surpriseMeBtn = document.getElementById('surprise-me-btn');
  const rouletteModal = document.getElementById('roulette-modal');
  const closeRouletteBtn = document.getElementById('close-roulette-btn');
  const rouletteTitle = document.getElementById('roulette-title');
  const rouletteAuthor = document.getElementById('roulette-author');
  const rouletteGenre = document.getElementById('roulette-genre');
  const roulettePages = document.getElementById('roulette-pages');
  const rouletteStatus = document.getElementById('roulette-status');
  const spinAgainBtn = document.getElementById('spin-again-btn');
  const acceptBookBtn = document.getElementById('accept-book-btn');
  let selectedRouletteBook = null;

  const noteModal = document.getElementById('note-modal');
  const closeNoteBtn = document.getElementById('close-note-btn');
  const cancelNoteBtn = document.getElementById('cancel-note-btn');
  const saveNoteBtn = document.getElementById('save-note-btn');
  const noteBookTitle = document.getElementById('note-book-title');
  const modalNoteTextarea = document.getElementById('modal-note-textarea');
  const modalStarRating = document.getElementById('modal-star-rating');
  let currentModalRating = 0;

  const exportJsonBtn = document.getElementById('export-json-btn');
  const importJsonInput = document.getElementById('import-json-input');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  // --- Helper: HTML Sanitizer ---
  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- Helper: Toast Notification ---
  function showToast(message, icon = '✨') {
    toastMessage.textContent = message;
    toastIcon.textContent = icon;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0');
    }, 3200);
  }

  // --- 1. Dynamic Light/Dark Theme Switcher Logic ---
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      currentTheme = savedTheme;
    } else {
      // Default to signature Midnight Dark mode
      currentTheme = 'dark';
    }
    applyTheme(currentTheme);
  }

  function applyTheme(theme) {
    currentTheme = theme;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      updateThemeButtons('dark');
    } else {
      document.documentElement.classList.remove('dark');
      updateThemeButtons('light');
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  function updateThemeButtons(theme) {
    // Desktop button
    if (themeToggleDesktop) {
      const icon = themeToggleDesktop.querySelector('.theme-icon');
      const text = themeToggleDesktop.querySelector('.theme-text');
      if (theme === 'dark') {
        if (icon) icon.textContent = '☀️';
        if (text) text.textContent = 'Light Mode';
        themeToggleDesktop.title = 'Switch to Pristine Paper Light Mode';
      } else {
        if (icon) icon.textContent = '🌙';
        if (text) text.textContent = 'Dark Mode';
        themeToggleDesktop.title = 'Switch to Midnight Dark Mode';
      }
    }

    // Mobile button
    if (themeToggleMobile) {
      const icon = themeToggleMobile.querySelector('.theme-icon');
      if (theme === 'dark') {
        if (icon) icon.textContent = '☀️';
        themeToggleMobile.title = 'Switch to Light Mode';
      } else {
        if (icon) icon.textContent = '🌙';
        themeToggleMobile.title = 'Switch to Dark Mode';
      }
    }
  }

  function toggleTheme() {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'dark' ? 'Midnight Dark' : 'Pristine Light'} mode.`, nextTheme === 'dark' ? '🌙' : '☀️');
  }

  // --- 2. Cinematic Intro & 12-Second Auto-Dismiss Logic ---
  function startCinematicIntroSequence() {
    let secondsLeft = 12;
    introTimerSeconds.textContent = secondsLeft;

    if (introCountdownInterval) clearInterval(introCountdownInterval);

    introCountdownInterval = setInterval(() => {
      secondsLeft--;
      introTimerSeconds.textContent = secondsLeft;
      if (secondsLeft <= 0) {
        clearInterval(introCountdownInterval);
        dismissCinematicIntro();
      }
    }, 1000);
  }

  function dismissCinematicIntro() {
    if (introCountdownInterval) {
      clearInterval(introCountdownInterval);
      introCountdownInterval = null;
    }
    if (cinematicIntro.classList.contains('intro-fade-out')) return;

    cinematicIntro.classList.add('intro-fade-out');
    sessionStorage.setItem(INTRO_SEEN_KEY, 'true');
    setTimeout(() => {
      cinematicIntro.style.display = 'none';
    }, 1000);
  }

  function handleCinematicIntro() {
    const hasSeen = sessionStorage.getItem(INTRO_SEEN_KEY);
    if (hasSeen === 'true') {
      cinematicIntro.style.display = 'none';
      return;
    }
    startCinematicIntroSequence();

    enterLibraryBtn.addEventListener('click', dismissCinematicIntro);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && cinematicIntro.style.display !== 'none' && !cinematicIntro.classList.contains('intro-fade-out')) {
        dismissCinematicIntro();
      }
    });

    if (replayIntroBtn) {
      replayIntroBtn.addEventListener('click', () => {
        cinematicIntro.style.display = 'flex';
        cinematicIntro.classList.remove('intro-fade-out');
        startCinematicIntroSequence();
      });
    }
  }

  // --- 3. LocalStorage Persistence & 120-Volume Seed Engine ---
  function loadBooksFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= 10) {
          books = parsed.sort((a, b) => b.id - a.id);
          return;
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage, initializing 120-volume dataset:', e);
    }

    // Default Seed of 120 curated volumes
    books = [...CURATED_120_BOOKS];
    saveBooksToStorage();
  }

  function saveBooksToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch (e) {
      console.error('Failed to save books to localStorage:', e);
    }
  }

  // --- 4. Live Metrics Calculation ---
  function updateLiveMetrics() {
    const totalCount = books.length;
    const finishedCount = books.filter(b => b.status === 'Finished').length;
    const readingCount = books.filter(b => b.status === 'Reading').length;
    const toReadCount = books.filter(b => b.status === 'To read').length;
    const totalPagesRead = books.reduce((acc, b) => acc + (Number(b.currentPage) || 0), 0);

    liveMetricsChip.innerHTML = `
      <span class="inline-flex items-center gap-1.5 font-medium flex-wrap">
        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold" style="background-color: var(--status-finished-bg); color: var(--status-finished-text); border: 1px solid var(--status-finished-border);">
          ${finishedCount} finished
        </span>
        <span class="text-slate-400">&bull;</span>
        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold" style="background-color: var(--status-reading-bg); color: var(--status-reading-text); border: 1px solid var(--status-reading-border);">
          ${readingCount} reading
        </span>
        <span class="text-slate-400">&bull;</span>
        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold" style="background-color: var(--status-toread-bg); color: var(--status-toread-text); border: 1px solid var(--status-toread-border);">
          ${toReadCount} to read
        </span>
        <span class="text-slate-400 hidden sm:inline">&bull;</span>
        <span class="text-xs hidden sm:inline" style="color: var(--text-muted);">
          <strong class="font-mono" style="color: var(--text-primary);">${totalPagesRead.toLocaleString()}</strong> pgs logged
        </span>
      </span>
    `;
  }

  // --- 5. Star Rating Generator ---
  function renderStarIcons(rating, bookId) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (rating || 0);
      starsHtml += `
        <button
          type="button"
          class="star-btn p-0.5 focus:outline-none"
          style="${isFilled ? 'color: var(--accent-gold);' : 'color: var(--border-light);'}"
          data-book-id="${bookId}"
          data-rating="${i}"
          title="Rate ${i} star${i > 1 ? 's' : ''}"
        >
          ${isFilled ? '★' : '☆'}
        </button>
      `;
    }
    return starsHtml;
  }

  // --- 6. Render Individual Book Card ---
  function createBookCardElement(book) {
    const card = document.createElement('article');
    card.id = `book-card-${book.id}`;
    card.dataset.id = book.id;
    card.className = 'book-card card-enter rounded-2xl p-4 sm:p-5 flex flex-col justify-between relative group border';

    const safeTitle = escapeHTML(book.title);
    const safeAuthor = escapeHTML(book.author);
    const safeGenre = escapeHTML(book.genre || 'Literature');
    const totalP = Math.max(1, Number(book.totalPages) || 300);
    const currentP = Math.min(totalP, Math.max(0, Number(book.currentPage) || 0));
    const percent = Math.min(100, Math.round((currentP / totalP) * 100));

    // Status Styling
    let badgeStyle = `background-color: var(--status-toread-bg); color: var(--status-toread-text); border: 1px solid var(--status-toread-border);`;
    let badgeIcon = `<svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

    if (book.status === 'Finished') {
      badgeStyle = `background-color: var(--status-finished-bg); color: var(--status-finished-text); border: 1px solid var(--status-finished-border);`;
      badgeIcon = `<svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>`;
    } else if (book.status === 'Reading') {
      badgeStyle = `background-color: var(--status-reading-bg); color: var(--status-reading-text); border: 1px solid var(--status-reading-border);`;
      badgeIcon = `<svg class="w-3 h-3 mr-1 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`;
    }

    card.innerHTML = `
      <div>
        <!-- Card Top Bar -->
        <div class="flex items-start justify-between gap-2.5 mb-2.5">
          <span class="inline-flex items-center text-[11px] font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-md border" style="background-color: var(--bg-surface-elevated); color: var(--accent-gold); border-color: var(--border-subtle);">
            ${safeGenre}
          </span>
          <div class="flex items-center gap-1">
            <button
              type="button"
              class="open-note-btn p-1.5 rounded-lg transition"
              style="color: var(--text-muted);"
              data-id="${book.id}"
              title="View/Edit Reflections & Rating"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              type="button"
              class="delete-book-btn p-1.5 rounded-lg transition hover:text-red-500"
              style="color: var(--text-muted);"
              data-id="${book.id}"
              title="Delete '${safeTitle}'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Title & Author -->
        <h3 class="font-playfair text-lg font-bold tracking-normal leading-snug mb-1 group-hover:text-amber-500 transition-colors" style="color: var(--text-primary);">
          ${safeTitle}
        </h3>
        <p class="text-xs font-cormorant italic flex items-center gap-1 mb-3" style="color: var(--text-muted);">
          <span>by</span>
          <span class="font-sans font-medium text-xs not-italic" style="color: var(--text-secondary);">${safeAuthor}</span>
        </p>

        <!-- Star Rating Snippet -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center text-sm rating-stars-container">
            ${renderStarIcons(book.rating, book.id)}
          </div>
          ${book.notes ? `<span class="text-[10px] font-mono px-2 py-0.5 rounded border" style="background-color: var(--bg-surface-elevated); color: var(--text-muted); border-color: var(--border-subtle);">Reflections logged</span>` : ''}
        </div>

        <!-- Reading Progress Bar -->
        <div class="rounded-xl p-3 mb-4 border" style="background-color: var(--bg-surface-elevated); border-color: var(--border-subtle);">
          <div class="flex items-center justify-between text-xs mb-1.5 font-medium" style="color: var(--text-secondary);">
            <span class="flex items-center gap-1">
              <span style="color: var(--text-muted);">Pages:</span>
              <span class="font-mono font-semibold" style="color: var(--text-primary);">${currentP}</span> / <span class="font-mono" style="color: var(--text-muted);">${totalP}</span>
            </span>
            <span class="font-mono text-[11px] font-semibold" style="color: ${percent === 100 ? 'var(--status-finished-text)' : 'var(--accent-gold)'};">
              ${percent}% completed
            </span>
          </div>

          <!-- Progress Bar Track -->
          <div class="w-full h-2 rounded-full overflow-hidden border" style="background-color: var(--bg-surface); border-color: var(--border-subtle);">
            <div
              class="h-full rounded-full transition-all duration-500 ${percent === 100 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-amber-500 to-amber-300'}"
              style="width: ${percent}%;"
            ></div>
          </div>

          <!-- Quick Stepper Controls -->
          <div class="flex items-center justify-between mt-2 pt-2 border-t text-[11px]" style="border-color: var(--border-subtle);">
            <span style="color: var(--text-muted);">Quick page log:</span>
            <div class="flex items-center gap-1">
              <button type="button" class="quick-page-btn px-2 py-0.5 rounded border transition active:scale-95" style="background-color: var(--bg-surface); border-color: var(--border-subtle); color: var(--text-secondary);" data-id="${book.id}" data-delta="-25">-25</button>
              <button type="button" class="quick-page-btn px-2 py-0.5 rounded border transition active:scale-95" style="background-color: var(--bg-surface); border-color: var(--border-subtle); color: var(--text-secondary);" data-id="${book.id}" data-delta="+25">+25</button>
              <button type="button" class="quick-page-btn px-2 py-0.5 rounded border transition active:scale-95 font-semibold" style="background-color: var(--bg-surface); border-color: var(--border-subtle); color: var(--accent-gold);" data-id="${book.id}" data-delta="max">Max</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Bottom: Status Badge & Switcher -->
      <div class="pt-3 border-t flex flex-wrap items-center justify-between gap-2.5" style="border-color: var(--border-subtle);">
        <span class="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full" style="${badgeStyle}">
          ${badgeIcon}
          ${book.status}
        </span>

        <div class="relative inline-flex items-center">
          <label for="status-select-${book.id}" class="sr-only">Change status</label>
          <select
            id="status-select-${book.id}"
            data-id="${book.id}"
            class="status-select-btn text-xs font-medium rounded-lg pl-2.5 pr-7 py-1.5 cursor-pointer transition appearance-none border focus:outline-none"
            style="background-color: var(--bg-surface-elevated); border-color: var(--border-subtle); color: var(--text-primary);"
          >
            <option value="To read" ${book.status === 'To read' ? 'selected' : ''}>To read</option>
            <option value="Reading" ${book.status === 'Reading' ? 'selected' : ''}>Reading</option>
            <option value="Finished" ${book.status === 'Finished' ? 'selected' : ''}>Finished</option>
          </select>
          <div class="pointer-events-none absolute right-2" style="color: var(--text-muted);">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    `;

    return card;
  }

  // --- 7. Filtering, Sorting & Pagination ---
  function getFilteredAndSortedBooks() {
    const query = currentSearchQuery.trim().toLowerCase();

    let result = books.filter(book => {
      const titleMatch = (book.title || '').toLowerCase().includes(query);
      const authorMatch = (book.author || '').toLowerCase().includes(query);
      const genreMatch = (book.genre || '').toLowerCase().includes(query);
      const matchesSearch = !query || titleMatch || authorMatch || genreMatch;

      const matchesStatus = currentStatusFilter === 'All' || book.status === currentStatusFilter;
      return matchesSearch && matchesStatus;
    });

    if (currentSortBy === 'title') {
      result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (currentSortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (currentSortBy === 'progress') {
      result.sort((a, b) => {
        const pA = (a.currentPage / a.totalPages) || 0;
        const pB = (b.currentPage / b.totalPages) || 0;
        return pB - pA;
      });
    } else {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }

  function renderBooks() {
    const filtered = getFilteredAndSortedBooks();
    const totalFiltered = filtered.length;

    // Toggle clear search button
    if (currentSearchQuery.trim().length > 0) {
      clearSearchBtn.classList.remove('hidden');
    } else {
      clearSearchBtn.classList.add('hidden');
    }

    // Pagination calculations
    const limit = itemsPerPage === 120 ? totalFiltered : itemsPerPage;
    const totalPages = Math.ceil(totalFiltered / limit) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalFiltered);
    const paginatedBooks = filtered.slice(startIndex, endIndex);

    // Update metadata indicators
    if (books.length === 0) {
      resultsCount.textContent = 'Library is empty';
      pageIndicator.textContent = 'Page 0 of 0';
    } else if (currentSearchQuery.trim() || currentStatusFilter !== 'All') {
      resultsCount.textContent = `Found ${totalFiltered} of ${books.length} volumes`;
      pageIndicator.textContent = `Showing ${startIndex + 1}–${endIndex} of ${totalFiltered}`;
    } else {
      resultsCount.textContent = `Cataloging ${books.length} volumes`;
      pageIndicator.textContent = `Showing ${startIndex + 1}–${endIndex} (Page ${currentPage} of ${totalPages})`;
    }

    // Render cards or empty state
    if (totalFiltered === 0) {
      booksContainer.innerHTML = '';
      emptyState.classList.remove('hidden');
      paginationControls.classList.add('hidden');

      if (books.length === 0) {
        emptyStateTitle.textContent = 'Your archive is empty';
        emptyStateDesc.textContent = 'Add your first book or reload the curated 120-volume classics.';
        emptyActionBtn.textContent = 'Load 120 Volumes';
        emptyActionBtn.onclick = () => {
          books = [...CURATED_120_BOOKS];
          saveBooksToStorage();
          currentPage = 1;
          renderBooks();
          showToast('120 classic volumes restored to archive!', '📚');
        };
      } else {
        emptyStateTitle.textContent = 'No matching volumes found';
        emptyStateDesc.textContent = `No volumes match "${escapeHTML(currentSearchQuery)}" under filter "${currentStatusFilter}".`;
        emptyActionBtn.textContent = 'Clear Search & Filters';
        emptyActionBtn.onclick = clearFiltersAndSearch;
      }
    } else {
      emptyState.classList.add('hidden');
      paginationControls.classList.remove('hidden');
      booksContainer.innerHTML = '';

      const fragment = document.createDocumentFragment();
      paginatedBooks.forEach(book => {
        fragment.appendChild(createBookCardElement(book));
      });
      booksContainer.appendChild(fragment);

      renderPaginationControls(totalPages);
    }

    updateLiveMetrics();
  }

  function renderPaginationControls(totalPages) {
    prevPageBtn.disabled = currentPage <= 1;
    nextPageBtn.disabled = currentPage >= totalPages;

    pageNumbersContainer.innerHTML = '';
    if (totalPages <= 1) return;

    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let p = startPage; p <= endPage; p++) {
      const pageBtn = document.createElement('button');
      pageBtn.type = 'button';
      pageBtn.className = `px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
        p === currentPage
          ? 'shadow-sm'
          : ''
      }`;
      if (p === currentPage) {
        pageBtn.style.backgroundColor = 'var(--accent-gold)';
        pageBtn.style.color = '#0f1117';
        pageBtn.style.borderColor = 'var(--accent-gold)';
      } else {
        pageBtn.style.backgroundColor = 'var(--bg-surface-elevated)';
        pageBtn.style.color = 'var(--text-secondary)';
        pageBtn.style.borderColor = 'var(--border-subtle)';
      }

      pageBtn.textContent = p;
      pageBtn.addEventListener('click', () => {
        currentPage = p;
        renderBooks();
        booksContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      pageNumbersContainer.appendChild(pageBtn);
    }
  }

  // --- 8. Deletion with Smooth Fade-Out ---
  function deleteBookWithAnimation(bookId) {
    const card = document.getElementById(`book-card-${bookId}`);
    if (!card) {
      books = books.filter(b => b.id !== bookId);
      saveBooksToStorage();
      renderBooks();
      return;
    }

    card.style.pointerEvents = 'none';
    card.classList.add('card-fade-out');

    setTimeout(() => {
      books = books.filter(b => b.id !== bookId);
      saveBooksToStorage();
      renderBooks();
      showToast('Volume removed from library.', '🗑️');
    }, 400);
  }

  // --- 9. Status & Stepper Handlers ---
  function updateBookStatus(bookId, newStatus) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    book.status = newStatus;
    if (newStatus === 'Finished') {
      book.currentPage = book.totalPages;
    } else if (newStatus === 'To read' && book.currentPage === book.totalPages) {
      book.currentPage = 0;
    }
    saveBooksToStorage();
    renderBooks();
    showToast(`Status updated to '${newStatus}'`, '✓');
  }

  function adjustBookPage(bookId, delta) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    if (delta === 'max') {
      book.currentPage = book.totalPages;
      book.status = 'Finished';
    } else {
      const numDelta = Number(delta);
      book.currentPage = Math.max(0, Math.min(book.totalPages, (Number(book.currentPage) || 0) + numDelta));
      if (book.currentPage === book.totalPages) {
        book.status = 'Finished';
      } else if (book.currentPage > 0 && book.status === 'To read') {
        book.status = 'Reading';
      }
    }

    saveBooksToStorage();
    renderBooks();
  }

  function setDirectRating(bookId, rating) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    book.rating = rating;
    saveBooksToStorage();
    renderBooks();
    showToast(`Rated ${rating} star${rating > 1 ? 's' : ''}!`, '★');
  }

  // --- 10. Form Validation & Submission ---
  function handleBookSubmission(titleVal, authorVal, statusVal, genreVal, curPageVal, totPageVal, notesVal, titleErrEl, authorErrEl, titleInputEl, authorInputEl, onSuccess) {
    const title = titleVal.trim();
    const author = authorVal.trim();
    let hasError = false;

    if (!title) {
      titleErrEl.classList.remove('hidden');
      titleInputEl.classList.add('border-red-500');
      hasError = true;
    } else {
      titleErrEl.classList.add('hidden');
      titleInputEl.classList.remove('border-red-500');
    }

    if (!author) {
      authorErrEl.classList.remove('hidden');
      authorInputEl.classList.add('border-red-500');
      hasError = true;
    } else {
      authorErrEl.classList.add('hidden');
      authorInputEl.classList.remove('border-red-500');
    }

    if (hasError) {
      if (!title) titleInputEl.focus();
      else authorInputEl.focus();
      return;
    }

    const totalP = Math.max(1, Number(totPageVal) || 300);
    let curP = Math.max(0, Number(curPageVal) || 0);
    if (statusVal === 'Finished') curP = totalP;
    if (curP > totalP) curP = totalP;

    const newBook = {
      id: Date.now(),
      title: title,
      author: author,
      status: statusVal,
      genre: genreVal.trim() || 'General Literature',
      currentPage: curP,
      totalPages: totalP,
      rating: statusVal === 'Finished' ? 5 : 0,
      notes: (notesVal || '').trim(),
      createdAt: new Date().toLocaleDateString()
    };

    // Newest added books MUST appear at the top (unshift)
    books.unshift(newBook);
    saveBooksToStorage();

    titleErrEl.classList.add('hidden');
    authorErrEl.classList.add('hidden');
    titleInputEl.classList.remove('border-red-500');
    authorInputEl.classList.remove('border-red-500');

    currentStatusFilter = 'All';
    currentSearchQuery = '';
    searchInput.value = '';
    currentPage = 1;
    updateFilterPillUI();

    renderBooks();
    showToast(`"${newBook.title}" archived to Midnight Library!`, '✦');

    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  }

  // --- 11. Notes & Reflections Modal ---
  function openNoteModal(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    activeEditingNoteBookId = bookId;
    currentModalRating = book.rating || 0;
    noteBookTitle.textContent = `"${book.title}" by ${book.author}`;
    modalNoteTextarea.value = book.notes || '';

    renderModalStars(currentModalRating);
    noteModal.classList.remove('hidden');
    setTimeout(() => modalNoteTextarea.focus(), 50);
  }

  function renderModalStars(rating) {
    modalStarRating.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('button');
      star.type = 'button';
      star.className = `p-1 cursor-pointer transition`;
      star.style.color = i <= rating ? 'var(--accent-gold)' : 'var(--border-light)';
      star.textContent = i <= rating ? '★' : '☆';
      star.addEventListener('click', () => {
        currentModalRating = i;
        renderModalStars(i);
      });
      modalStarRating.appendChild(star);
    }
  }

  function closeNoteModal() {
    noteModal.classList.add('hidden');
    activeEditingNoteBookId = null;
  }

  function saveNoteModal() {
    if (!activeEditingNoteBookId) return;
    const book = books.find(b => b.id === activeEditingNoteBookId);
    if (!book) return;

    book.notes = modalNoteTextarea.value.trim();
    book.rating = currentModalRating;
    saveBooksToStorage();
    closeNoteModal();
    renderBooks();
    showToast('Reflections saved to volume archive.', '✎');
  }

  // --- 12. Random "Surprise Me" Roulette ---
  function openSurpriseRoulette() {
    let pool = books.filter(b => b.status === 'To read');
    if (pool.length === 0) pool = books.filter(b => b.status === 'Reading');
    if (pool.length === 0) pool = [...books];

    if (pool.length === 0) {
      showToast('No books available to pick from!', '⚠️');
      return;
    }

    rouletteModal.classList.remove('hidden');

    let spinCount = 0;
    const maxSpins = 8;
    const spinInterval = setInterval(() => {
      const tempPick = pool[Math.floor(Math.random() * pool.length)];
      rouletteTitle.textContent = tempPick.title;
      rouletteAuthor.textContent = `by ${tempPick.author}`;
      rouletteGenre.textContent = tempPick.genre || 'Literature';
      roulettePages.textContent = `${tempPick.totalPages || 300} pages`;
      rouletteStatus.textContent = tempPick.status;

      spinCount++;
      if (spinCount >= maxSpins) {
        clearInterval(spinInterval);
        selectedRouletteBook = pool[Math.floor(Math.random() * pool.length)];
        rouletteTitle.textContent = selectedRouletteBook.title;
        rouletteAuthor.textContent = `by ${selectedRouletteBook.author}`;
        rouletteGenre.textContent = selectedRouletteBook.genre || 'Literature';
        roulettePages.textContent = `${selectedRouletteBook.totalPages || 300} pages`;
        rouletteStatus.textContent = selectedRouletteBook.status;
      }
    }, 70);
  }

  function closeSurpriseRoulette() {
    rouletteModal.classList.add('hidden');
    selectedRouletteBook = null;
  }

  function acceptRouletteSelection() {
    if (!selectedRouletteBook) return;
    selectedRouletteBook.status = 'Reading';
    saveBooksToStorage();
    closeSurpriseRoulette();
    renderBooks();
    showToast(`Started reading "${selectedRouletteBook.title}"!`, '📖');

    const card = document.getElementById(`book-card-${selectedRouletteBook.id}`);
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // --- 13. JSON Backup: Export & Import ---
  function exportDatabaseAsJSON() {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(books, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `midnight_library_backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Library database exported to JSON file.', '💾');
    } catch (e) {
      console.error('Failed to export JSON:', e);
      showToast('Export failed. Check browser console.', '⚠️');
    }
  }

  function handleImportJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (!Array.isArray(imported)) {
          throw new Error('Imported JSON is not an array.');
        }

        const validBooks = imported.filter(b => b && b.title && b.author).map(b => ({
          id: b.id || Date.now() + Math.random(),
          title: String(b.title),
          author: String(b.author),
          status: ['To read', 'Reading', 'Finished'].includes(b.status) ? b.status : 'To read',
          genre: b.genre ? String(b.genre) : 'General Literature',
          currentPage: Math.max(0, Number(b.currentPage) || 0),
          totalPages: Math.max(1, Number(b.totalPages) || 300),
          rating: Math.min(5, Math.max(0, Number(b.rating) || 0)),
          notes: b.notes ? String(b.notes) : '',
          createdAt: b.createdAt || new Date().toLocaleDateString()
        }));

        if (validBooks.length === 0) {
          throw new Error('No valid book entries found.');
        }

        books = validBooks.sort((a, b) => b.id - a.id);
        saveBooksToStorage();
        currentPage = 1;
        renderBooks();
        showToast(`Successfully imported ${validBooks.length} volumes!`, '📦');
      } catch (err) {
        console.error('Import failed:', err);
        showToast('Invalid JSON backup file. Import cancelled.', '⚠️');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  // --- 14. UI Helpers ---
  function clearFiltersAndSearch() {
    currentSearchQuery = '';
    searchInput.value = '';
    currentStatusFilter = 'All';
    currentPage = 1;
    updateFilterPillUI();
    renderBooks();
  }

  function updateFilterPillUI() {
    const pills = filterPillsContainer.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
      const filter = pill.dataset.filter;
      if (filter === currentStatusFilter) {
        pill.style.backgroundColor = 'var(--accent-gold)';
        pill.style.color = '#0f1117';
        pill.style.borderColor = 'var(--accent-gold)';
        pill.classList.add('shadow-sm');
      } else {
        pill.style.backgroundColor = 'var(--bg-surface-elevated)';
        pill.style.color = 'var(--text-secondary)';
        pill.style.borderColor = 'var(--border-subtle)';
        pill.classList.remove('shadow-sm');
      }
    });
  }

  // --- 15. Setup Event Listeners ---
  function setupEventListeners() {
    // Theme Toggles
    if (themeToggleDesktop) themeToggleDesktop.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

    // Desktop Form
    if (bookForm) {
      bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleBookSubmission(
          titleInput.value,
          authorInput.value,
          statusInput.value,
          genreInput.value,
          currentPageInput.value,
          totalPagesInput.value,
          notesInput.value,
          titleError,
          authorError,
          titleInput,
          authorInput,
          () => {
            bookForm.reset();
            statusInput.value = 'To read';
          }
        );
      });

      titleInput.addEventListener('input', () => {
        if (titleInput.value.trim().length > 0) {
          titleError.classList.add('hidden');
          titleInput.classList.remove('border-red-500');
        }
      });

      authorInput.addEventListener('input', () => {
        if (authorInput.value.trim().length > 0) {
          authorError.classList.add('hidden');
          authorInput.classList.remove('border-red-500');
        }
      });
    }

    // Modal Form
    const openAddModal = () => {
      bookModal.classList.remove('hidden');
      setTimeout(() => modalTitleInput.focus(), 60);
    };
    const closeAddModal = () => {
      bookModal.classList.add('hidden');
      modalBookForm.reset();
      modalTitleError.classList.add('hidden');
      modalAuthorError.classList.add('hidden');
      modalTitleInput.classList.remove('border-red-500');
      modalAuthorInput.classList.remove('border-red-500');
    };

    if (headerAddBookBtn) headerAddBookBtn.addEventListener('click', openAddModal);
    if (mobileAddBtn) mobileAddBtn.addEventListener('click', openAddModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeAddModal);
    bookModal.addEventListener('click', (e) => {
      if (e.target === bookModal) closeAddModal();
    });

    modalBookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleBookSubmission(
        modalTitleInput.value,
        modalAuthorInput.value,
        modalStatusInput.value,
        modalGenreInput.value,
        modalCurrentPageInput.value,
        modalTotalPagesInput.value,
        '',
        modalTitleError,
        modalAuthorError,
        modalTitleInput,
        modalAuthorInput,
        closeAddModal
      );
    });

    modalTitleInput.addEventListener('input', () => {
      if (modalTitleInput.value.trim().length > 0) {
        modalTitleError.classList.add('hidden');
        modalTitleInput.classList.remove('border-red-500');
      }
    });

    modalAuthorInput.addEventListener('input', () => {
      if (modalAuthorInput.value.trim().length > 0) {
        modalAuthorError.classList.add('hidden');
        modalAuthorInput.classList.remove('border-red-500');
      }
    });

    // Search & Sort
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      currentPage = 1;
      renderBooks();
    });

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentSearchQuery = '';
      currentPage = 1;
      searchInput.focus();
      renderBooks();
    });

    filterPillsContainer.addEventListener('click', (e) => {
      const button = e.target.closest('.filter-pill');
      if (!button) return;
      currentStatusFilter = button.dataset.filter;
      currentPage = 1;
      updateFilterPillUI();
      renderBooks();
    });

    sortSelect.addEventListener('change', (e) => {
      currentSortBy = e.target.value;
      renderBooks();
    });

    // Reset Default Catalog
    resetSampleBtn.addEventListener('click', () => {
      if (confirm('Reload the pristine 120-volume curated catalog? Your current changes will be refreshed.')) {
        books = [...CURATED_120_BOOKS];
        saveBooksToStorage();
        clearFiltersAndSearch();
        showToast('Default 120-volume catalog loaded.', '📚');
      }
    });

    // Pagination
    prevPageBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderBooks();
        booksContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    nextPageBtn.addEventListener('click', () => {
      const totalFiltered = getFilteredAndSortedBooks().length;
      const limit = itemsPerPage === 120 ? totalFiltered : itemsPerPage;
      const totalPages = Math.ceil(totalFiltered / limit);
      if (currentPage < totalPages) {
        currentPage++;
        renderBooks();
        booksContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    itemsPerPageSelect.addEventListener('change', (e) => {
      itemsPerPage = Number(e.target.value);
      currentPage = 1;
      renderBooks();
    });

    // Roulette
    surpriseMeBtn.addEventListener('click', openSurpriseRoulette);
    closeRouletteBtn.addEventListener('click', closeSurpriseRoulette);
    spinAgainBtn.addEventListener('click', openSurpriseRoulette);
    acceptBookBtn.addEventListener('click', acceptRouletteSelection);

    // Notes
    closeNoteBtn.addEventListener('click', closeNoteModal);
    cancelNoteBtn.addEventListener('click', closeNoteModal);
    saveNoteBtn.addEventListener('click', saveNoteModal);

    // Export & Import
    exportJsonBtn.addEventListener('click', exportDatabaseAsJSON);
    importJsonInput.addEventListener('change', handleImportJSON);

    // Delegation on Cards
    booksContainer.addEventListener('change', (e) => {
      if (e.target.matches('.status-select-btn')) {
        const bookId = Number(e.target.dataset.id);
        updateBookStatus(bookId, e.target.value);
      }
    });

    booksContainer.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.delete-book-btn');
      if (deleteBtn) {
        const bookId = Number(deleteBtn.dataset.id);
        deleteBookWithAnimation(bookId);
        return;
      }

      const quickPageBtn = e.target.closest('.quick-page-btn');
      if (quickPageBtn) {
        const bookId = Number(quickPageBtn.dataset.id);
        const delta = quickPageBtn.dataset.delta;
        adjustBookPage(bookId, delta);
        return;
      }

      const starBtn = e.target.closest('.star-btn');
      if (starBtn) {
        const bookId = Number(starBtn.dataset.bookId);
        const rating = Number(starBtn.dataset.rating);
        setDirectRating(bookId, rating);
        return;
      }

      const noteBtn = e.target.closest('.open-note-btn');
      if (noteBtn) {
        const bookId = Number(noteBtn.dataset.id);
        openNoteModal(bookId);
        return;
      }
    });

    // Global Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!bookModal.classList.contains('hidden')) closeAddModal();
        if (!noteModal.classList.contains('hidden')) closeNoteModal();
        if (!rouletteModal.classList.contains('hidden')) closeSurpriseRoulette();
      }
    });
  }

  // --- Initialization ---
  function init() {
    initTheme();
    handleCinematicIntro();
    loadBooksFromStorage();
    setupEventListeners();
    updateLiveMetrics();
    renderBooks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
