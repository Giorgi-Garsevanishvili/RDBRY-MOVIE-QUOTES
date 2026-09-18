<?php

namespace Database\Seeders;

use App\Models\Genre;
use App\Models\Movie;
use App\Models\Quote;
use App\Models\QuoteNotification;
use App\Models\User;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Spatie\MediaLibrary\HasMedia;

final class DemoContentSeeder extends Seeder
{
	private const string DEMO_PASSWORD = 'password';

	private const array USERS = [
		'moviefan' => ['username' => 'moviefan', 'email' => 'moviefan@example.com', 'joined_days_ago' => 180],
		'mariam'   => ['username' => 'mariam', 'email' => 'mariam@example.com', 'joined_days_ago' => 160],
		'davit'    => ['username' => 'davit', 'email' => 'davit@example.com', 'joined_days_ago' => 140],
		'nino'     => ['username' => 'nino', 'email' => 'nino@example.com', 'joined_days_ago' => 120],
		'luka'     => ['username' => 'luka', 'email' => 'luka@example.com', 'joined_days_ago' => 100],
		'ana'      => ['username' => 'ana', 'email' => 'ana@example.com', 'joined_days_ago' => 80],
		'dato'     => ['username' => 'dato', 'email' => 'dato@example.com', 'joined_days_ago' => 60],
		'salome'   => ['username' => 'salome', 'email' => 'salome@example.com', 'joined_days_ago' => 40],
	];

	private const array GENRES = [
		'drama'           => ['name_en' => 'Drama', 'name_ka' => 'დრამა'],
		'science_fiction' => ['name_en' => 'Science Fiction', 'name_ka' => 'სამეცნიერო ფანტასტიკა'],
		'adventure'       => ['name_en' => 'Adventure', 'name_ka' => 'სათავგადასავლო'],
		'fantasy'         => ['name_en' => 'Fantasy', 'name_ka' => 'ფენტეზი'],
		'comedy'          => ['name_en' => 'Comedy', 'name_ka' => 'კომედია'],
		'romance'         => ['name_en' => 'Romance', 'name_ka' => 'რომანტიკა'],
		'action'          => ['name_en' => 'Action', 'name_ka' => 'მძაფრსიუჟეტიანი'],
		'crime'           => ['name_en' => 'Crime', 'name_ka' => 'კრიმინალური'],
		'animation'       => ['name_en' => 'Animation', 'name_ka' => 'ანიმაცია'],
		'musical'         => ['name_en' => 'Musical', 'name_ka' => 'მუსიკალური'],
	];

	private const array MOVIES = [
		'interstellar' => [
			'owner'          => 'moviefan',
			'name_en'        => 'Interstellar',
			'name_ka'        => 'ინტერსტელარი',
			'director_en'    => 'Christopher Nolan',
			'director_ka'    => 'კრისტოფერ ნოლანი',
			'description_en' => 'Explorers travel through a wormhole in space to secure humanity’s future.',
			'description_ka' => 'მკვლევრები კოსმოსურ გვირაბში მოგზაურობენ, რათა კაცობრიობის მომავალი გადაარჩინონ.',
			'release_year'   => 2014,
			'genres'         => ['drama', 'science_fiction', 'adventure'],
			'quote_en'       => 'You have to leave something behind to go forward.',
			'quote_ka'       => 'წინ წასასვლელად რაღაც უნდა დატოვო უკან.',
			'asset'          => 'resources/js/assets/landing/interstellar.png',
			'published_ago'  => 400,
		],
		'royal_tenenbaums' => [
			'owner'          => 'mariam',
			'name_en'        => 'The Royal Tenenbaums',
			'name_ka'        => 'ტენენბაუმების ოჯახი',
			'director_en'    => 'Wes Anderson',
			'director_ka'    => 'უეს ანდერსონი',
			'description_en' => 'An estranged family of former child prodigies reunites under one roof.',
			'description_ka' => 'ერთ დროს გამორჩეული ბავშვების გაუცხოებული ოჯახი კვლავ ერთ ჭერქვეშ იკრიბება.',
			'release_year'   => 2001,
			'genres'         => ['drama', 'comedy', 'romance'],
			'quote_en'       => 'I think we’re just gonna have to be secretly in love with each other and leave it at that.',
			'quote_ka'       => 'როგორც ჩანს, ერთმანეთი საიდუმლოდ უნდა გვიყვარდეს და ყველაფერი ასე დავტოვოთ.',
			'asset'          => 'resources/js/assets/landing/royal-tenenbaums.png',
			'published_ago'  => 380,
		],
		'lord_of_the_rings' => [
			'owner'          => 'davit',
			'name_en'        => 'The Lord of the Rings: The Return of the King',
			'name_ka'        => 'ბეჭდების მბრძანებელი: მეფის დაბრუნება',
			'director_en'    => 'Peter Jackson',
			'director_ka'    => 'პიტერ ჯექსონი',
			'description_en' => 'Gandalf and Aragorn lead the free peoples against Sauron while Frodo approaches Mount Doom.',
			'description_ka' => 'განდალფი და არაგორნი თავისუფალ ხალხებს საურონის წინააღმდეგ მიუძღვებიან, ხოლო ფროდო განწირულების მთას უახლოვდება.',
			'release_year'   => 2003,
			'genres'         => ['drama', 'adventure', 'fantasy'],
			'quote_en'       => 'I see in your eyes the same fear that would take the heart of me.',
			'quote_ka'       => 'შენს თვალებში იმავე შიშს ვხედავ, რომელიც მეც გულს მიკლავდა.',
			'asset'          => 'resources/js/assets/landing/lord-of-the-rings.png',
			'published_ago'  => 360,
		],
		'billy_elliot' => [
			'owner'          => 'nino',
			'name_en'        => 'Billy Elliot',
			'name_ka'        => 'ბილი ელიოტი',
			'director_en'    => 'Stephen Daldry',
			'director_ka'    => 'სტივენ დოლდრი',
			'description_en' => 'A coal miner’s son discovers an unexpected passion for ballet.',
			'description_ka' => 'მეშახტის ვაჟი საკუთარ თავში ბალეტის მოულოდნელ სიყვარულს აღმოაჩენს.',
			'release_year'   => 2000,
			'genres'         => ['drama', 'comedy'],
			'quote_en'       => 'I don’t want a childhood. I want to be a ballet dancer.',
			'quote_ka'       => 'მე ბავშვობა არ მინდა. ბალეტის მოცეკვავე მინდა გავხდე.',
			'asset'          => 'database/seeders/assets/billy-elliot.jpg',
			'published_ago'  => 340,
		],
		'casablanca' => [
			'owner'          => 'luka',
			'name_en'        => 'Casablanca',
			'name_ka'        => 'კასაბლანკა',
			'director_en'    => 'Michael Curtiz',
			'director_ka'    => 'მაიკლ კერტისი',
			'description_en' => 'A nightclub owner must choose between love and helping a resistance hero escape.',
			'description_ka' => 'ღამის კლუბის მფლობელმა სიყვარულსა და წინააღმდეგობის გმირის დახმარებას შორის უნდა აირჩიოს.',
			'release_year'   => 1942,
			'genres'         => ['drama', 'romance'],
			'quote_en'       => 'Here’s looking at you, kid.',
			'quote_ka'       => 'გიყურებ, პატარავ.',
			'asset'          => 'database/seeders/assets/casablanca.jpg',
			'published_ago'  => 320,
		],
		'spider_man_no_way_home' => [
			'owner'          => 'ana',
			'name_en'        => 'Spider-Man: No Way Home',
			'name_ka'        => 'ადამიანი-ობობა: სახლისკენ გზა არ არის',
			'director_en'    => 'Jon Watts',
			'director_ka'    => 'ჯონ უოტსი',
			'description_en' => 'A spell fractures the multiverse and brings dangerous visitors into Peter Parker’s world.',
			'description_ka' => 'შელოცვა მრავალსამყაროს არღვევს და პიტერ პარკერის სამყაროში სახიფათო სტუმრებს იწვევს.',
			'release_year'   => 2021,
			'genres'         => ['action', 'adventure', 'fantasy'],
			'quote_en'       => 'With great power, there must also come great responsibility.',
			'quote_ka'       => 'დიდ ძალას დიდი პასუხისმგებლობაც უნდა მოჰყვეს.',
			'asset'          => 'database/seeders/assets/spider-man-no-way-home.png',
			'published_ago'  => 300,
		],
		'the_dark_knight' => [
			'owner'          => 'moviefan',
			'name_en'        => 'The Dark Knight',
			'name_ka'        => 'ბნელი რაინდი',
			'director_en'    => 'Christopher Nolan',
			'director_ka'    => 'კრისტოფერ ნოლანი',
			'description_en' => 'Batman faces a criminal mastermind who plunges Gotham into chaos.',
			'description_ka' => 'ბეტმენი დანაშაულის ოსტატს უპირისპირდება, რომელიც გოთემს ქაოსში ხვევს.',
			'release_year'   => 2008,
			'genres'         => ['drama', 'action', 'crime'],
			'quote_en'       => 'Why so serious?',
			'quote_ka'       => 'რატომ ხარ ასეთი სერიოზული?',
			'asset'          => 'database/seeders/assets/the-dark-knight.png',
			'published_ago'  => 280,
		],
		'la_la_land' => [
			'owner'          => 'nino',
			'name_en'        => 'La La Land',
			'name_ka'        => 'ლა ლა ლენდი',
			'director_en'    => 'Damien Chazelle',
			'director_ka'    => 'დეიმენ შაზელი',
			'description_en' => 'A pianist and an actor fall in love while pursuing their dreams in Los Angeles.',
			'description_ka' => 'პიანისტსა და მსახიობს ლოს-ანჯელესში ოცნებებისკენ სწრაფვისას ერთმანეთი უყვარდებათ.',
			'release_year'   => 2016,
			'genres'         => ['drama', 'romance', 'musical'],
			'quote_en'       => 'Here’s to the fools who dream.',
			'quote_ka'       => 'გაუმარჯოს მეოცნებე სულელებს.',
			'asset'          => 'database/seeders/assets/la-la-land.png',
			'published_ago'  => 260,
		],
		'cinema_paradiso' => [
			'owner'          => 'dato',
			'name_en'        => 'Cinema Paradiso',
			'name_ka'        => 'კინოთეატრი პარადისო',
			'director_en'    => 'Giuseppe Tornatore',
			'director_ka'    => 'ჯუზეპე ტორნატორე',
			'description_en' => 'A filmmaker remembers the projectionist who inspired his childhood love of cinema.',
			'description_ka' => 'კინორეჟისორი იხსენებს კინომექანიკოსს, რომელმაც ბავშვობაში კინო შეაყვარა.',
			'release_year'   => 1988,
			'genres'         => ['drama', 'romance'],
			'quote_en'       => 'Life isn’t like in the movies. Life is much harder.',
			'quote_ka'       => 'ცხოვრება ფილმს არ ჰგავს. ცხოვრება ბევრად რთულია.',
			'asset'          => 'database/seeders/assets/cinema-paradiso.png',
			'published_ago'  => 240,
		],
		'grand_budapest_hotel' => [
			'owner'          => 'mariam',
			'name_en'        => 'The Grand Budapest Hotel',
			'name_ka'        => 'სასტუმრო გრანდ ბუდაპეშტი',
			'director_en'    => 'Wes Anderson',
			'director_ka'    => 'უეს ანდერსონი',
			'description_en' => 'A devoted concierge and his lobby boy become entangled in a family fortune.',
			'description_ka' => 'ერთგული კონსიერჟი და მისი ახალგაზრდა თანაშემწე ოჯახური მემკვიდრეობის ბრძოლაში ეხვევიან.',
			'release_year'   => 2014,
			'genres'         => ['drama', 'comedy', 'adventure'],
			'quote_en'       => 'There are still faint glimmers of civilization left in this barbaric slaughterhouse.',
			'quote_ka'       => 'ამ ბარბაროსულ სასაკლაოშიც კი ცივილიზაციის მკრთალი ნაპერწკლები ჯერ კიდევ ჩანს.',
			'asset'          => 'database/seeders/assets/grand-budapest-hotel.jpg',
			'published_ago'  => 220,
		],
		'blade_runner_2049' => [
			'owner'          => 'dato',
			'name_en'        => 'Blade Runner 2049',
			'name_ka'        => 'დანაზე მორბენალი 2049',
			'director_en'    => 'Denis Villeneuve',
			'director_ka'    => 'დენი ვილნევი',
			'description_en' => 'A replicant officer uncovers a secret that could transform what remains of society.',
			'description_ka' => 'რეპლიკანტი ოფიცერი საიდუმლოს აღმოაჩენს, რომელსაც საზოგადოების შეცვლა შეუძლია.',
			'release_year'   => 2017,
			'genres'         => ['drama', 'science_fiction', 'action'],
			'quote_en'       => 'All the best memories are hers.',
			'quote_ka'       => 'ყველა საუკეთესო მოგონება მას ეკუთვნის.',
			'asset'          => 'database/seeders/assets/blade-runner-2049.png',
			'published_ago'  => 200,
		],
		'the_truman_show' => [
			'owner'          => 'moviefan',
			'name_en'        => 'The Truman Show',
			'name_ka'        => 'ტრუმენის შოუ',
			'director_en'    => 'Peter Weir',
			'director_ka'    => 'პიტერ უირი',
			'description_en' => 'An insurance salesman discovers that his entire life is a television production.',
			'description_ka' => 'დაზღვევის აგენტი აღმოაჩენს, რომ მთელი მისი ცხოვრება სატელევიზიო შოუა.',
			'release_year'   => 1998,
			'genres'         => ['drama', 'comedy', 'science_fiction'],
			'quote_en'       => 'Good morning, and in case I don’t see you, good afternoon, good evening, and good night!',
			'quote_ka'       => 'დილა მშვიდობისა, და თუ ვეღარ გნახავთ, კარგ დღეს, საღამოს და ღამეს გისურვებთ!',
			'asset'          => 'database/seeders/assets/the-truman-show.png',
			'published_ago'  => 180,
		],
		'back_to_the_future' => [
			'owner'          => 'dato',
			'name_en'        => 'Back to the Future',
			'name_ka'        => 'უკან მომავალში',
			'director_en'    => 'Robert Zemeckis',
			'director_ka'    => 'რობერტ ზემეკისი',
			'description_en' => 'A teenager travels to the past and must ensure that his parents fall in love.',
			'description_ka' => 'მოზარდი წარსულში მოგზაურობს და უნდა დარწმუნდეს, რომ მისი მშობლები ერთმანეთს შეიყვარებენ.',
			'release_year'   => 1985,
			'genres'         => ['comedy', 'science_fiction', 'adventure'],
			'quote_en'       => 'Roads? Where we’re going, we don’t need roads.',
			'quote_ka'       => 'გზები? იქ, სადაც მივდივართ, გზები არ გვჭირდება.',
			'asset'          => 'database/seeders/assets/back-to-the-future.png',
			'published_ago'  => 160,
		],
		'roman_holiday' => [
			'owner'          => 'salome',
			'name_en'        => 'Roman Holiday',
			'name_ka'        => 'რომაული არდადეგები',
			'director_en'    => 'William Wyler',
			'director_ka'    => 'უილიამ უაილერი',
			'description_en' => 'A princess escapes her duties for one day and explores Rome with a reporter.',
			'description_ka' => 'პრინცესა ერთი დღით მოვალეობებს გაურბის და ჟურნალისტთან ერთად რომს ათვალიერებს.',
			'release_year'   => 1953,
			'genres'         => ['comedy', 'romance'],
			'quote_en'       => 'Rome. By all means, Rome.',
			'quote_ka'       => 'რომი. რა თქმა უნდა, რომი.',
			'asset'          => 'database/seeders/assets/roman-holiday.png',
			'published_ago'  => 140,
		],
		'rear_window' => [
			'owner'          => 'luka',
			'name_en'        => 'Rear Window',
			'name_ka'        => 'უკანა ფანჯარა',
			'director_en'    => 'Alfred Hitchcock',
			'director_ka'    => 'ალფრედ ჰიჩკოკი',
			'description_en' => 'A photographer confined to his apartment suspects that a neighbor committed murder.',
			'description_ka' => 'სახლში გამოკეტილ ფოტოგრაფს ეჭვი უჩნდება, რომ მეზობელმა მკვლელობა ჩაიდინა.',
			'release_year'   => 1954,
			'genres'         => ['drama', 'crime'],
			'quote_en'       => 'We’ve become a race of Peeping Toms.',
			'quote_ka'       => 'თვალთვალის მოყვარულთა საზოგადოებად ვიქეცით.',
			'asset'          => 'database/seeders/assets/rear-window.png',
			'published_ago'  => 120,
		],
		'toy_story' => [
			'owner'          => 'ana',
			'name_en'        => 'Toy Story',
			'name_ka'        => 'სათამაშოების ისტორია',
			'director_en'    => 'John Lasseter',
			'director_ka'    => 'ჯონ ლასეტერი',
			'description_en' => 'A cowboy doll feels threatened when a new space ranger becomes his owner’s favorite toy.',
			'description_ka' => 'კოვბოი თოჯინა საფრთხეს გრძნობს, როცა კოსმოსური რეინჯერი პატრონის საყვარელი სათამაშო ხდება.',
			'release_year'   => 1995,
			'genres'         => ['animation', 'comedy', 'adventure'],
			'quote_en'       => 'To infinity and beyond!',
			'quote_ka'       => 'უსასრულობისკენ და მის მიღმა!',
			'asset'          => 'database/seeders/assets/toy-story.png',
			'published_ago'  => 100,
		],
		'the_matrix' => [
			'owner'          => 'davit',
			'name_en'        => 'The Matrix',
			'name_ka'        => 'მატრიცა',
			'director_en'    => 'Lana Wachowski and Lilly Wachowski',
			'director_ka'    => 'ლანა ვაჩოვსკი და ლილი ვაჩოვსკი',
			'description_en' => 'A hacker learns that reality is a simulation and joins a rebellion against its machines.',
			'description_ka' => 'ჰაკერი იგებს, რომ რეალობა სიმულაციაა და მანქანების წინააღმდეგ აჯანყებას უერთდება.',
			'release_year'   => 1999,
			'genres'         => ['science_fiction', 'action'],
			'quote_en'       => 'There is no spoon.',
			'quote_ka'       => 'კოვზი არ არსებობს.',
			'asset'          => 'database/seeders/assets/the-matrix.png',
			'published_ago'  => 80,
		],
		'whiplash' => [
			'owner'          => 'nino',
			'name_en'        => 'Whiplash',
			'name_ka'        => 'უიპლეში',
			'director_en'    => 'Damien Chazelle',
			'director_ka'    => 'დეიმენ შაზელი',
			'description_en' => 'An ambitious jazz drummer is pushed to his limits by a demanding instructor.',
			'description_ka' => 'ამბიციურ ჯაზის დრამერს მომთხოვნი მასწავლებელი შესაძლებლობების ზღვრამდე მიიყვანს.',
			'release_year'   => 2014,
			'genres'         => ['drama', 'musical'],
			'quote_en'       => 'There are no two words more harmful than good job.',
			'quote_ka'       => 'კარგი ნამუშევარი ყველაზე მავნე ორი სიტყვაა.',
			'asset'          => 'database/seeders/assets/whiplash.jpg',
			'published_ago'  => 60,
		],
		'walter_mitty' => [
			'owner'          => 'salome',
			'name_en'        => 'The Secret Life of Walter Mitty',
			'name_ka'        => 'უოლტერ მიტის საიდუმლო ცხოვრება',
			'director_en'    => 'Ben Stiller',
			'director_ka'    => 'ბენ სტილერი',
			'description_en' => 'A quiet photo editor leaves his daydreams behind and begins a global adventure.',
			'description_ka' => 'მორცხვი ფოტო რედაქტორი ოცნებებს თავს ანებებს და ნამდვილ თავგადასავალში მიემგზავრება.',
			'release_year'   => 2013,
			'genres'         => ['drama', 'comedy', 'adventure'],
			'quote_en'       => 'Beautiful things don’t ask for attention.',
			'quote_ka'       => 'მშვენიერი რამეები ყურადღებას არ ითხოვენ.',
			'asset'          => 'database/seeders/assets/walter-mitty.png',
			'published_ago'  => 40,
		],
		'moonrise_kingdom' => [
			'owner'          => 'mariam',
			'name_en'        => 'Moonrise Kingdom',
			'name_ka'        => 'მთვარის ამოსვლის სამეფო',
			'director_en'    => 'Wes Anderson',
			'director_ka'    => 'უეს ანდერსონი',
			'description_en' => 'Two young runaways prompt their island community to organize a search party.',
			'description_ka' => 'ორი გაქცეული მოზარდი კუნძულის მცხოვრებლებს სამძებრო ჯგუფის შექმნას აიძულებს.',
			'release_year'   => 2012,
			'genres'         => ['drama', 'comedy', 'romance'],
			'quote_en'       => 'I love you, but you don’t know what you’re talking about.',
			'quote_ka'       => 'მიყვარხარ, მაგრამ არ იცი, რას ამბობ.',
			'asset'          => 'database/seeders/assets/moonrise-kingdom.png',
			'published_ago'  => 20,
		],
	];

	private const array COMMENTS = [
		['The cinematography makes this moment unforgettable.', 'კადრის ფერები და განათება საოცარია.'],
		['This scene gets better every time I watch it.', 'ამ სცენას ყოველ ჯერზე ახალი ემოცია მოაქვს.'],
		['The music gives this line even more weight.', 'მუსიკა ამ ფრაზას კიდევ უფრო ძლიერს ხდის.'],
		['One of the most memorable moments in the film.', 'ფილმის ერთ-ერთი ყველაზე დასამახსოვრებელი მომენტია.'],
		['The performance here is absolutely brilliant.', 'ამ სცენაში მსახიობის თამაში გამორჩეულია.'],
		['I could rewatch this scene endlessly.', 'ამ სცენის უსასრულოდ ნახვა შემიძლია.'],
		['This quote captures the whole story perfectly.', 'ეს ფრაზა მთელ ამბავს შესანიშნავად აჯამებს.'],
		['A simple line with so much meaning behind it.', 'მარტივი ფრაზაა, მაგრამ ძალიან დიდი აზრი აქვს.'],
		['The delivery of this line is perfect.', 'ეს ფრაზა იდეალური ინტონაციით არის ნათქვამი.'],
		['This is exactly why the movie is a classic.', 'სწორედ ამიტომ არის ეს ფილმი კლასიკა.'],
	];

	public function run(): void
	{
		$users = $this->seedUsers();
		$genres = $this->seedGenres();
		$quotes = $this->seedMoviesAndQuotes($users, $genres);

		$this->seedInteractions($users, $quotes);
	}

	/** @return array<string, User> */
	private function seedUsers(): array
	{
		$users = [];

		foreach (self::USERS as $key => $attributes)
		{
			$joinedAt = now()->subDays($attributes['joined_days_ago']);
			$user = User::query()->updateOrCreate(
				['email' => $attributes['email']],
				[
					'username'          => $attributes['username'],
					'email_verified_at' => $joinedAt,
					'password'          => self::DEMO_PASSWORD,
				],
			);

			$this->setTimestamps($user, $joinedAt);
			$users[$key] = $user;
		}

		return $users;
	}

	/** @return array<string, Genre> */
	private function seedGenres(): array
	{
		$genres = [];

		foreach (self::GENRES as $key => $attributes)
		{
			$genres[$key] = Genre::query()->updateOrCreate(
				['name_en' => $attributes['name_en']],
				['name_ka' => $attributes['name_ka']],
			);
		}

		return $genres;
	}

	/**
	 * @param array<string, User>  $users
	 * @param array<string, Genre> $genres
	 *
	 * @return array<string, Quote>
	 */
	private function seedMoviesAndQuotes(array $users, array $genres): array
	{
		$quotes = [];

		foreach (self::MOVIES as $key => $definition)
		{
			$owner = $users[$definition['owner']];
			$publishedAt = now()->subHours($definition['published_ago']);
			$movie = $owner->movies()->updateOrCreate(
				['name_en' => $definition['name_en']],
				[
					'name_ka'        => $definition['name_ka'],
					'director_en'    => $definition['director_en'],
					'director_ka'    => $definition['director_ka'],
					'description_en' => $definition['description_en'],
					'description_ka' => $definition['description_ka'],
					'release_year'   => $definition['release_year'],
				],
			);

			$movie->genres()->sync(array_map(
				static fn (string $genre): int => $genres[$genre]->id,
				$definition['genres'],
			));
			$this->addMedia($movie, Movie::POSTER_COLLECTION, $definition['asset']);
			$this->setTimestamps($movie, $publishedAt->copy()->subDays(7));

			$quote = $owner->quotes()->updateOrCreate(
				['movie_id' => $movie->id, 'text_en' => $definition['quote_en']],
				['text_ka' => $definition['quote_ka']],
			);
			$this->addMedia($quote, Quote::IMAGE_COLLECTION, $definition['asset']);
			$this->setTimestamps($quote, $publishedAt);

			$quotes[$key] = $quote;
		}

		return $quotes;
	}

	/**
	 * @param array<string, User>  $users
	 * @param array<string, Quote> $quotes
	 */
	private function seedInteractions(array $users, array $quotes): void
	{
		$members = array_values($users);

		foreach (array_values($quotes) as $quoteIndex => $quote)
		{
			$actors = array_values(array_filter(
				$members,
				static fn (User $member): bool => $member->id !== $quote->user_id,
			));
			$firstActor = $actors[$quoteIndex % count($actors)];
			$secondActor = $actors[($quoteIndex + 2) % count($actors)];
			$comments = self::COMMENTS[$quoteIndex % count(self::COMMENTS)];
			$sequence = ($quoteIndex * 2) + 1;
			$publishedAgo = self::MOVIES[array_keys(self::MOVIES)[$quoteIndex]]['published_ago'];

			$this->seedLike($firstActor, $quote, now()->subHours($publishedAgo - 1), $sequence, true);
			$this->seedComment($firstActor, $quote, $comments[0], now()->subHours($publishedAgo - 2), $sequence, true);
			$this->seedLike($secondActor, $quote, now()->subHours($publishedAgo - 3), $sequence + 1, false);
			$this->seedComment($secondActor, $quote, $comments[1], now()->subHours($publishedAgo - 4), $sequence + 1, false);
		}
	}

	private function seedLike(
		User $actor,
		Quote $quote,
		CarbonInterface $createdAt,
		int $sequence,
		bool $read,
	): void {
		$like = $actor->likes()->firstOrCreate(['quote_id' => $quote->id]);

		$this->setTimestamps($like, $createdAt);
		$this->seedNotification('quote_liked', $actor, $quote, $createdAt, $sequence, $read);
	}

	private function seedComment(
		User $actor,
		Quote $quote,
		string $body,
		CarbonInterface $createdAt,
		int $sequence,
		bool $read,
	): void {
		$comment = $actor->comments()->firstOrCreate([
			'quote_id' => $quote->id,
			'body'     => $body,
		]);

		$this->setTimestamps($comment, $createdAt);
		$this->seedNotification('quote_commented', $actor, $quote, $createdAt, $sequence, $read);
	}

	private function seedNotification(
		string $type,
		User $actor,
		Quote $quote,
		CarbonInterface $createdAt,
		int $sequence,
		bool $read,
	): void {
		$notification = QuoteNotification::query()->updateOrCreate(
			['id' => $this->notificationId($type, $sequence)],
			[
				'type'            => $type,
				'notifiable_type' => User::class,
				'notifiable_id'   => $quote->user_id,
				'actor_id'        => $actor->id,
				'quote_id'        => $quote->id,
				'data'            => [
					'actor' => [
						'id'       => $actor->id,
						'username' => $actor->username,
					],
					'quoteId' => $quote->id,
				],
				'read_at' => $read ? $createdAt : null,
			],
		);

		$this->setTimestamps($notification, $createdAt);
	}

	private function notificationId(string $type, int $sequence): string
	{
		$prefix = $type === 'quote_liked' ? '10000000' : '20000000';

		return sprintf('%s-0000-4000-8000-%012d', $prefix, $sequence);
	}

	private function addMedia(HasMedia $model, string $collection, string $asset): void
	{
		if ($model->hasMedia($collection))
		{
			return;
		}

		$model->addMedia(base_path($asset))
			->preservingOriginal()
			->toMediaCollection($collection);
	}

	private function setTimestamps(Model $model, CarbonInterface $createdAt): void
	{
		$model->forceFill([
			'created_at' => $createdAt,
			'updated_at' => $createdAt,
		])->save();
	}
}
