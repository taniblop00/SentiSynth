import { faker } from '@faker-js/faker';

export interface QAPair {
    system_prompt?: string;
    question: string;
    answer: string;
}

export const QA_CATEGORIES = {
    ai_ml: "🤖 AI & Machine Learning",
    software_eng: "💻 Software Engineering",
    science: "🔬 Science (Physics/Chemistry)",
    biology: "🧬 Biology & Zoology",
    history: "🏛️ History & Geography",
    business: "💼 Business & Finance",
    ecommerce: "🛒 E-commerce & Retail",
    creative: "✍️ Creative Writing",
    engineering: "⚙️ Engineering & Aviation",
    music: "🎵 Music & Culture",
    devops: "☁️ IT & Cloud DevOps",
    hr: "🤝 Human Resources",
    health: "🥗 Health & Fitness",
    culinary: "🍳 Culinary Arts",
    cybersec: "🔒 Cyber Security",
    general_trivia: "🌍 Everyday Questions"
};

type QAGenerator = () => QAPair;

const qaTemplates: Record<string, QAGenerator[]> = {
    ai_ml: [
        () => ({
            system_prompt: "You are an expert Machine Learning engineer and AI research scientist.",
            question: `How does the ${faker.hacker.noun()} model optimize the loss function during backpropagation?`,
            answer: `During backpropagation, the ${faker.hacker.noun()} model computes the gradient of the loss function with respect to each weight. By applying a ${faker.hacker.adjective()} learning rate, it updates the parameters to minimize error using ${faker.hacker.ingverb()} techniques, ensuring the ${faker.company.buzzNoun()} converges efficiently.`
        })
    ],
    software_eng: [
        () => ({
            system_prompt: "You are a Senior Technical Lead explaining software architecture to a Junior Developer.",
            question: `What are the benefits of using a ${faker.hacker.adjective()} architecture for our new ${faker.company.catchPhrase()} application?`,
            answer: `A ${faker.hacker.adjective()} architecture significantly improves modularity. It prevents tight coupling when we need to ${faker.hacker.verb()} external APIs. Furthermore, since we process heavy ${faker.hacker.noun()} data, this design allows independent scaling of the ${faker.company.buzzNoun()} services without bottlenecking the main thread.`
        })
    ],
    science: [
        () => ({
            system_prompt: "You are a Nobel Prize winning Chemist explaining foundational concepts.",
            question: `Can you explain the reaction when ${faker.science.chemicalElement().name} is exposed to high temperatures?`,
            answer: `When ${faker.science.chemicalElement().name} is heated, it undergoes a rapid endothermic phase shift. The atomic structure becomes highly ${faker.word.adjective()}, frequently emitting ${faker.science.unit().name} of energy. This reaction is fundamental in synthesizing ${faker.commerce.productMaterial()} compounds.`
        })
    ],
    biology: [
        () => ({
            system_prompt: "You are a renowned Wildlife Biologist and Zoo Director.",
            question: `What is the evolutionary advantage of the ${faker.animal.type()}'s unique physical traits?`,
            answer: `The ${faker.animal.type()} has evolved these traits primarily to survive in ${faker.word.adjective()} climates. Its specialized ${faker.commerce.productMaterial()}-like biological covering drastically reduces water loss by ${faker.number.int({ min: 10, max: 90 })}%, allowing it to thrive while hunting elusive prey.`
        })
    ],
    history: [
        () => ({
            system_prompt: "You are a Professor of Global History and Geography.",
            question: `What were the geographic factors that led to the economic rise of ${faker.location.city()} in ${faker.location.country()}?`,
            answer: `The rise of ${faker.location.city()} was largely dictated by its proximity to the ${faker.location.street()} river basin. This ${faker.word.adjective()} location provided a natural defense and made it a central hub for trading ${faker.commerce.product()}s. Over the centuries, this strategic advantage cemented its global influence.`
        })
    ],
    business: [
        () => ({
            system_prompt: "You are an elite Wall Street Financial Analyst.",
            question: `Why did ${faker.company.name()} decide to pivot to ${faker.commerce.department()} last quarter?`,
            answer: `${faker.company.name()} identified a massive gap in the ${faker.commerce.department()} market. By leveraging ${faker.company.buzzAdjective()} ${faker.company.buzzNoun()}, they aim to increase their ${faker.finance.transactionType()} efficiency. This aggressive pivot is expected to yield a ${faker.number.int({ min: 15, max: 300 })}% ROI by Q4.`
        })
    ],
    ecommerce: [
        () => ({
            system_prompt: "You are an Amazon Top Seller and E-commerce consultant.",
            question: `What are the key selling points of the new ${faker.commerce.productAdjective()} ${faker.commerce.product()}?`,
            answer: `The new ${faker.commerce.product()} stands out because of its ${faker.commerce.productMaterial()} construction. Selling at just ${faker.finance.amount()} ${faker.finance.currencyCode()}, it dominates the ${faker.commerce.department()} category. Customers consistently praise its ${faker.word.adjective()} durability.`
        })
    ],
    creative: [
        () => ({
            system_prompt: "You are a New York Times bestselling author holding a creative writing masterclass.",
            question: `How should I develop the motivation for a character who is a ${faker.person.jobTitle()}?`,
            answer: `A compelling ${faker.person.jobTitle()} is driven by deep emotional stakes. Start by giving them a profound failure related to their field. Perhaps they failed to secure a ${faker.company.catchPhrase()} contract. This failure creates a ${faker.word.adjective()} internal conflict that drives every future decision in your narrative.`
        })
    ],
    engineering: [
        () => ({
            system_prompt: "You are an Aerospace Engineer and test pilot.",
            question: `What makes the aerodynamics of the new ${faker.vehicle.manufacturer()} aircraft superior?`,
            answer: `The new aircraft from ${faker.vehicle.manufacturer()} utilizes advanced swept-wing geometries made of lightweight ${faker.commerce.productMaterial()}. This drastically minimizes drag when cruising, while the custom ${faker.hacker.noun()} software optimizes fuel injection, resulting in a highly ${faker.word.adjective()} flight profile.`
        })
    ],
    music: [
        () => ({
            system_prompt: "You are a legendary Music Producer who has won 10 Grammy Awards.",
            question: `How did the ${faker.music.genre()} genre influence the production of this latest track?`,
            answer: `The implementation of ${faker.music.genre()} elements completely transformed the track. The artist used syncopated rhythms combined with a very ${faker.word.adjective()} bassline. We then added organic layers—literally recording a ${faker.commerce.product()} being hit—to give it that raw, underground feel.`
        })
    ],
    devops: [
        () => ({
            system_prompt: "You are a Principal DevOps Engineer focusing on cloud infrastructure.",
            question: `How do we prevent downtime when deploying the ${faker.hacker.adjective()} microservice?`,
            answer: `To prevent downtime, we use a Blue-Green deployment strategy. First, we spin up the new ${faker.hacker.adjective()} container alongside the old one. We run health checks using the ${faker.hacker.noun()} protocol. Once verified, the load balancer shifts traffic seamlessly avoiding any disruption during the ${faker.hacker.ingverb()} phase.`
        })
    ],
    hr: [
        () => ({
            system_prompt: "You are a Chief Human Resources Officer for a Fortune 500 company.",
            question: `What is the most effective strategy for onboarding a new ${faker.person.jobTitle()}?`,
            answer: `A successful strategy involves pairing them immediately with a veteran mentor. We outline precise 30-day goals focusing on ${faker.company.buzzNoun()} integration. Most importantly, we train them in our ${faker.word.adjective()} corporate culture to ensure they feel valued from day one.`
        })
    ],
    health: [
        () => ({
            system_prompt: "You are a certified Dietitian and personal trainer to professional athletes.",
            question: `Does a ${faker.word.adjective()} diet really improve cardiovascular endurance?`,
            answer: `Absolutely. A ${faker.word.adjective()} diet is heavily linked to reducing systemic inflammation. By focusing on whole foods rather than processed ${faker.commerce.productMaterial()} substitutes, the body manages oxygen synthesis much better during heavy exertion, drastically improving overall V02 max over time.`
        })
    ],
    culinary: [
        () => ({
            system_prompt: "You are a Michelin-star Chef running a high-end restaurant in Paris.",
            question: `What is the secret to getting a perfectly ${faker.word.adjective()} texture when cooking ${faker.food.dish()}?`,
            answer: `The secret lies in controlling the heat directly after introducing the ${faker.food.ingredient()}. You must maintain a precise simmer while slowly folding in ${faker.food.spice()}. If you rush the emulation, the ${faker.food.dish()} will break, completely ruining that iconic ${faker.word.adjective()} texture.`
        })
    ],
    cybersec: [
        () => ({
            system_prompt: "You are a White-Hat Hacker working for the National Security Agency.",
            question: `How does an attacker typically bypass a standard ${faker.hacker.noun()} firewall?`,
            answer: `Attackers look for misconfigurations in the ${faker.hacker.adjective()} security layer. They might use a zero-day exploit targeting the ${faker.hacker.noun()} port. Once inside, they inject malicious code into the ${faker.hacker.abbreviation()} process, masking their signature and allowing unrestricted ${faker.hacker.ingverb()} of the database.`
        })
    ],
    general_trivia: [
        // --- GEOGRAPHY ---
        () => {
            const country = faker.location.country();
            const capital = faker.location.city();
            return {
                system_prompt: "You are a knowledgeable geography teacher.",
                question: `What is the capital city of ${country}?`,
                answer: `The capital city of ${country} is ${capital}.`
            };
        },
        () => {
            const city = faker.location.city();
            const country = faker.location.country();
            return {
                system_prompt: "You are a helpful geography tutor.",
                question: `In which continent would you typically find a country like ${country}?`,
                answer: `${country} is located in one of the major world continents. Countries like ${country} are typically found in regions determined by their geographic coordinates — bordered by neighboring nations, bodies of water, and distinct cultural zones.`
            };
        },
        () => {
            const city1 = faker.location.city();
            const city2 = faker.location.city();
            const km = faker.number.int({ min: 200, max: 9000 });
            return {
                system_prompt: "You are a geography and travel expert.",
                question: `Approximately how far is ${city1} from ${city2}?`,
                answer: `The approximate distance between ${city1} and ${city2} is around ${km} kilometers, depending on the exact route taken (straight line vs. road or air travel distance).`
            };
        },
        () => {
            const country = faker.location.country();
            const currency = faker.finance.currencyName();
            return {
                system_prompt: "You are a world knowledge expert.",
                question: `What currency does ${country} use?`,
                answer: `${country} uses the ${currency} as its official currency for everyday transactions. Currency differs by country and is regulated by the nation's central bank.`
            };
        },

        // --- BASIC MATH ---
        () => {
            const a = faker.number.int({ min: 2, max: 25 });
            const b = faker.number.int({ min: 2, max: 25 });
            return {
                system_prompt: "You are a patient and encouraging math tutor.",
                question: `What is ${a} multiplied by ${b}?`,
                answer: `${a} × ${b} = ${a * b}. To solve this, you can think of it as adding ${a} to itself ${b} times, which gives you ${a * b}.`
            };
        },
        () => {
            const a = faker.number.int({ min: 10, max: 200 });
            const b = faker.number.int({ min: 2, max: a });
            return {
                system_prompt: "You are a friendly math tutor.",
                question: `What is ${a} divided by ${b}?`,
                answer: `${a} ÷ ${b} = ${(a / b).toFixed(2)}. Division tells us how many times ${b} fits into ${a}.`
            };
        },
        () => {
            const a = faker.number.int({ min: 5, max: 999 });
            const b = faker.number.int({ min: 5, max: 999 });
            return {
                system_prompt: "You are a math helper.",
                question: `What is ${a} plus ${b}?`,
                answer: `${a} + ${b} = ${a + b}. Addition combines both numbers to give you a total sum.`
            };
        },
        () => {
            const total = faker.number.int({ min: 100, max: 1000 });
            const pct = faker.helpers.arrayElement([10, 15, 20, 25, 50]);
            return {
                system_prompt: "You are a practical math and finance educator.",
                question: `What is ${pct}% of ${total}?`,
                answer: `${pct}% of ${total} is ${(total * pct / 100).toFixed(2)}. To calculate a percentage, multiply the number by the percentage and divide by 100.`
            };
        },
        () => {
            const side = faker.number.int({ min: 2, max: 20 });
            return {
                system_prompt: "You are a geometry tutor.",
                question: `What is the area of a square with a side length of ${side}?`,
                answer: `The area of a square with side ${side} is ${side} × ${side} = ${side * side} square units. Area = side².`
            };
        },
        () => {
            const r = faker.number.int({ min: 1, max: 15 });
            return {
                system_prompt: "You are a geometry teacher.",
                question: `What is the approximate circumference of a circle with a radius of ${r}?`,
                answer: `The circumference = 2 × π × r = 2 × 3.14159 × ${r} ≈ ${(2 * Math.PI * r).toFixed(2)} units. Circumference is the distance all the way around the circle.`
            };
        },

        // --- SCIENCE & NATURE ---
        () => {
            const element = faker.science.chemicalElement();
            return {
                system_prompt: "You are a friendly chemistry teacher.",
                question: `What is the chemical symbol for ${element.name}?`,
                answer: `The chemical symbol for ${element.name} is **${element.symbol}**. It has an atomic number of ${element.atomicNumber} on the periodic table.`
            };
        },
        () => {
            const animals: Record<string, string> = {
                elephant: 'the largest land animal on Earth, native to Africa and Asia',
                dolphin: 'a highly intelligent marine mammal known for its playful behavior',
                eagle: 'a large bird of prey with exceptional eyesight',
                chameleon: 'a reptile famous for its ability to change skin color',
                octopus: 'a marine invertebrate with eight arms and remarkable intelligence',
                penguin: 'a flightless bird that thrives in cold climates like Antarctica',
                giraffe: 'the tallest living terrestrial animal, native to Africa',
                cheetah: 'the fastest land animal, capable of speeds up to 120 km/h',
            };
            const [animal, description] = faker.helpers.objectEntry(animals);
            return {
                system_prompt: "You are an engaging wildlife expert.",
                question: `What is special about the ${animal}?`,
                answer: `The ${animal} is ${description}. It is one of the most fascinating creatures in the animal kingdom.`
            };
        },
        () => {
            const planets = [
                { name: 'Mercury', fact: 'the closest planet to the Sun and the smallest in our solar system' },
                { name: 'Venus', fact: 'the hottest planet in our solar system, with surface temperatures over 450°C' },
                { name: 'Earth', fact: 'the only known planet to support life, covered 71% by water' },
                { name: 'Mars', fact: 'called the Red Planet due to its iron oxide surface' },
                { name: 'Jupiter', fact: 'the largest planet, a gas giant with a famous Great Red Spot storm' },
                { name: 'Saturn', fact: 'known for its stunning ring system made of ice and rock' },
                { name: 'Uranus', fact: 'an ice giant that rotates on its side' },
                { name: 'Neptune', fact: 'the windiest planet, with storms reaching 2,100 km/h' },
            ];
            const planet = faker.helpers.arrayElement(planets);
            return {
                system_prompt: "You are an enthusiastic astronomy teacher.",
                question: `Tell me an interesting fact about the planet ${planet.name}.`,
                answer: `${planet.name} is ${planet.fact}. It is one of the eight planets in our solar system.`
            };
        },
        () => {
            const bodyParts: Record<string, string> = {
                heart: 'pumps blood throughout the body, beating around 100,000 times per day',
                lungs: 'are responsible for exchanging oxygen and carbon dioxide with the air we breathe',
                brain: 'is the control center of the body, processing information and regulating all functions',
                liver: 'filters toxins from the blood and helps with digestion by producing bile',
                kidneys: 'filter waste products from the blood and produce urine',
                stomach: 'breaks down food using acids and enzymes during digestion',
            };
            const [organ, role] = faker.helpers.objectEntry(bodyParts);
            return {
                system_prompt: "You are a human biology teacher explaining the body simply.",
                question: `What does the ${organ} do in the human body?`,
                answer: `The ${organ} ${role}. It is a vital organ essential for maintaining overall health.`
            };
        },
        () => {
            const weatherTypes = [
                { type: 'tornado', desc: 'a rapidly rotating column of air that extends from a thunderstorm to the ground' },
                { type: 'hurricane', desc: 'a large tropical storm system with strong winds exceeding 119 km/h' },
                { type: 'blizzard', desc: 'a severe snowstorm with strong winds and near-zero visibility' },
                { type: 'drought', desc: 'a prolonged period of abnormally low rainfall, leading to water shortages' },
                { type: 'heatwave', desc: 'a prolonged period of excessively hot weather, often with high humidity' },
                { type: 'fog', desc: 'a thick cloud of tiny water droplets near the ground that reduces visibility' },
            ];
            const w = faker.helpers.arrayElement(weatherTypes);
            return {
                system_prompt: "You are a friendly meteorology expert.",
                question: `What is a ${w.type}?`,
                answer: `A ${w.type} is ${w.desc}. It is an important weather phenomenon studied by meteorologists.`
            };
        },
        () => {
            const trees = ['oak', 'pine', 'maple', 'birch', 'willow', 'cherry', 'palm', 'sequoia'];
            const tree = faker.helpers.arrayElement(trees);
            const facts: Record<string, string> = {
                oak: 'known for its strength and longevity, often living over 500 years',
                pine: 'an evergreen that keeps its needles year-round and produces pine cones',
                maple: 'famous for its beautiful autumn colors and being the source of maple syrup',
                birch: 'recognized by its distinctive white, papery bark',
                willow: 'known for its long, drooping branches, often found near water',
                cherry: 'produces beautiful blossoms in spring and edible fruit in summer',
                palm: 'a tropical tree with a tall trunk and large feathery or fan-shaped leaves',
                sequoia: 'the largest tree species on Earth by volume, native to California',
            };
            return {
                system_prompt: "You are a nature and botany enthusiast.",
                question: `What is the ${tree} tree known for?`,
                answer: `The ${tree} tree is ${facts[tree]}. It is a fascinating and important part of many ecosystems.`
            };
        },

        // --- ANIMALS ---
        () => {
            const pairs = [
                { animal: 'cow', sound: 'moo' }, { animal: 'dog', sound: 'bark' },
                { animal: 'cat', sound: 'meow' }, { animal: 'duck', sound: 'quack' },
                { animal: 'lion', sound: 'roar' }, { animal: 'snake', sound: 'hiss' },
                { animal: 'bee', sound: 'buzz' }, { animal: 'frog', sound: 'croak' },
                { animal: 'horse', sound: 'neigh' }, { animal: 'owl', sound: 'hoot' },
            ];
            const pair = faker.helpers.arrayElement(pairs);
            return {
                system_prompt: "You are a fun and educational animal facts teacher.",
                question: `What sound does a ${pair.animal} make?`,
                answer: `A ${pair.animal} makes a "${pair.sound}" sound. Animals communicate in many ways, and this is the characteristic sound of a ${pair.animal}.`
            };
        },
        () => {
            const lifespan_facts = [
                { animal: 'elephant', lifespan: '60–70 years' },
                { animal: 'parrot', lifespan: 'up to 80 years' },
                { animal: 'dog', lifespan: '10–13 years on average' },
                { animal: 'tortoise', lifespan: 'over 150 years in some species' },
                { animal: 'mayfly', lifespan: 'only 24 hours as an adult' },
                { animal: 'butterfly', lifespan: '2–4 weeks on average' },
                { animal: 'shark', lifespan: 'up to 400 years (Greenland shark)' },
                { animal: 'mouse', lifespan: '1–3 years' },
            ];
            const fact = faker.helpers.arrayElement(lifespan_facts);
            return {
                system_prompt: "You are an engaging wildlife and biology educator.",
                question: `How long does a ${fact.animal} typically live?`,
                answer: `A ${fact.animal} typically lives ${fact.lifespan}. Lifespan varies greatly across species depending on environment, diet, and genetics.`
            };
        },
        () => {
            const groups = [
                { animal: 'wolves', group: 'pack' }, { animal: 'fish', group: 'school' },
                { animal: 'birds', group: 'flock' }, { animal: 'lions', group: 'pride' },
                { animal: 'bees', group: 'swarm' }, { animal: 'elephants', group: 'herd' },
                { animal: 'geese', group: 'gaggle' }, { animal: 'crows', group: 'murder' },
                { animal: 'whales', group: 'pod' }, { animal: 'ants', group: 'colony' },
            ];
            const g = faker.helpers.arrayElement(groups);
            return {
                system_prompt: "You are an animal facts expert.",
                question: `What is a group of ${g.animal} called?`,
                answer: `A group of ${g.animal} is called a "${g.group}". These collective nouns are a fun and fascinating part of language and animal behavior.`
            };
        },
        () => {
            const fastest = [
                { animal: 'cheetah', speed: '120 km/h', category: 'land animal' },
                { animal: 'peregrine falcon', speed: '389 km/h', category: 'bird (diving)' },
                { animal: 'sailfish', speed: '110 km/h', category: 'fish' },
                { animal: 'horse', speed: '88 km/h', category: 'domesticated land animal' },
                { animal: 'ostrich', speed: '70 km/h', category: 'flightless bird' },
            ];
            const f = faker.helpers.arrayElement(fastest);
            return {
                system_prompt: "You are a nature and wildlife facts expert.",
                question: `How fast can a ${f.animal} run or move?`,
                answer: `The ${f.animal} can reach speeds of up to ${f.speed}, making it one of the fastest ${f.category}s in the world. Speed is a key survival trait for this animal.`
            };
        },

        // --- FOOD & COOKING ---
        () => {
            const dish = faker.food.dish();
            const ingredient = faker.food.ingredient();
            return {
                system_prompt: "You are a professional chef sharing culinary knowledge.",
                question: `What is ${dish} and how is it typically made?`,
                answer: `${dish} is a popular dish enjoyed in many cultures. It is typically made using ${ingredient} along with other complementary ingredients, seasoned and prepared through various cooking techniques like roasting, simmering, or sautéing.`
            };
        },
        () => {
            const vitamins = [
                { v: 'Vitamin C', found: 'oranges, strawberries, and bell peppers', benefit: 'boosts immunity and helps with iron absorption' },
                { v: 'Vitamin D', found: 'sunlight, fatty fish, and fortified dairy', benefit: 'supports bone health and immune function' },
                { v: 'Vitamin B12', found: 'meat, eggs, and dairy products', benefit: 'is essential for nerve function and red blood cell production' },
                { v: 'Iron', found: 'red meat, spinach, and legumes', benefit: 'is critical for transporting oxygen in the blood' },
                { v: 'Calcium', found: 'milk, cheese, and leafy greens', benefit: 'builds and maintains strong bones and teeth' },
                { v: 'Potassium', found: 'bananas, potatoes, and beans', benefit: 'regulates fluid balance and supports heart health' },
            ];
            const vit = faker.helpers.arrayElement(vitamins);
            return {
                system_prompt: "You are a certified nutritionist explaining healthy eating.",
                question: `What does ${vit.v} do for the body, and where can I find it?`,
                answer: `${vit.v} ${vit.benefit}. You can get it naturally from ${vit.found}. Getting enough of this nutrient through a balanced diet is important for overall wellbeing.`
            };
        },
        () => {
            const spice = faker.food.spice();
            return {
                system_prompt: "You are a culinary expert and food historian.",
                question: `What is ${spice} commonly used for in cooking?`,
                answer: `${spice} is a popular culinary spice used to add distinctive flavor and aroma to a wide range of dishes. It is commonly used in marinades, sauces, soups, and baked goods, and has been valued both for culinary and medicinal purposes throughout history.`
            };
        },
        () => {
            const methods = [
                { method: 'boiling', desc: 'cooking food in water at 100°C, great for pasta, eggs, and vegetables' },
                { method: 'grilling', desc: 'cooking food over a direct heat source, adding a smoky charred flavor' },
                { method: 'baking', desc: 'cooking food in a dry oven with surrounding heat, ideal for bread and pastries' },
                { method: 'steaming', desc: 'cooking food over boiling water without direct contact, preserving nutrients' },
                { method: 'frying', desc: 'cooking food in hot oil, resulting in a crispy and golden exterior' },
                { method: 'roasting', desc: 'cooking food in the oven uncovered, great for meats and vegetables' },
            ];
            const m = faker.helpers.arrayElement(methods);
            return {
                system_prompt: "You are a home cooking instructor.",
                question: `What is the cooking method called "${m.method}"?`,
                answer: `${m.method.charAt(0).toUpperCase() + m.method.slice(1)} is a cooking method that involves ${m.desc}. It is one of the fundamental techniques used in kitchens worldwide.`
            };
        },

        // --- HISTORY & CULTURE ---
        () => {
            const inventions = [
                { item: 'the telephone', year: 1876, person: 'Alexander Graham Bell' },
                { item: 'the light bulb', year: 1879, person: 'Thomas Edison' },
                { item: 'the airplane', year: 1903, person: 'the Wright Brothers' },
                { item: 'penicillin', year: 1928, person: 'Alexander Fleming' },
                { item: 'the World Wide Web', year: 1989, person: 'Tim Berners-Lee' },
                { item: 'the printing press', year: 1440, person: 'Johannes Gutenberg' },
                { item: 'the steam engine', year: 1769, person: 'James Watt' },
                { item: 'the television', year: 1926, person: 'John Logie Baird' },
            ];
            const inv = faker.helpers.arrayElement(inventions);
            return {
                system_prompt: "You are a history of technology expert.",
                question: `Who invented ${inv.item} and when?`,
                answer: `${inv.item.charAt(0).toUpperCase() + inv.item.slice(1)} was invented by ${inv.person} around ${inv.year}. This invention fundamentally changed the way people lived and worked.`
            };
        },
        () => {
            const wonders = [
                'the Great Wall of China', 'the Colosseum in Rome', 'the Taj Mahal in India',
                'Machu Picchu in Peru', 'the Great Pyramid of Giza', 'Chichén Itzá in Mexico',
                'Christ the Redeemer in Brazil', 'Petra in Jordan',
            ];
            const wonder = faker.helpers.arrayElement(wonders);
            return {
                system_prompt: "You are a world history and culture educator.",
                question: `What is ${wonder} and why is it famous?`,
                answer: `${wonder} is one of the world's most iconic landmarks, recognized globally for its historical, cultural, and architectural significance. It draws millions of tourists each year and represents the ingenuity of the civilization that built it.`
            };
        },
        () => {
            const languages = [
                { lang: 'Mandarin Chinese', speakers: '1.1 billion', region: 'China and parts of Southeast Asia' },
                { lang: 'Spanish', speakers: '500 million', region: 'Spain, Latin America, and parts of the US' },
                { lang: 'English', speakers: '1.5 billion', region: 'worldwide as a first or second language' },
                { lang: 'Arabic', speakers: '420 million', region: 'the Middle East and North Africa' },
                { lang: 'Hindi', speakers: '600 million', region: 'India and surrounding regions' },
                { lang: 'Portuguese', speakers: '260 million', region: 'Brazil, Portugal, and parts of Africa' },
            ];
            const l = faker.helpers.arrayElement(languages);
            return {
                system_prompt: "You are a linguistics and world cultures expert.",
                question: `How many people speak ${l.lang} and where is it spoken?`,
                answer: `${l.lang} is spoken by approximately ${l.speakers} people, primarily in ${l.region}. It is one of the most widely spoken languages in the world.`
            };
        },
        () => {
            const holidays = [
                { holiday: 'Christmas', date: 'December 25', tradition: 'gift-giving, family gatherings, and decorating trees' },
                { holiday: "New Year's Day", date: 'January 1', tradition: 'fireworks, resolutions, and celebrations at midnight' },
                { holiday: 'Halloween', date: 'October 31', tradition: 'costume wearing, trick-or-treating, and carving pumpkins' },
                { holiday: 'Thanksgiving', date: 'the fourth Thursday of November (US)', tradition: 'sharing a large meal with family and giving thanks' },
                { holiday: 'Eid al-Fitr', date: 'the end of Ramadan (Islamic calendar)', tradition: 'prayers, feasting, and giving gifts to children' },
                { holiday: 'Diwali', date: 'October or November (Hindu calendar)', tradition: 'lighting oil lamps, fireworks, and sweets sharing' },
            ];
            const h = faker.helpers.arrayElement(holidays);
            return {
                system_prompt: "You are a world cultures and traditions expert.",
                question: `When is ${h.holiday} celebrated, and what are the main traditions?`,
                answer: `${h.holiday} is celebrated on ${h.date}. Common traditions include ${h.tradition}. It is a widely recognized occasion enjoyed by millions around the world.`
            };
        },

        // --- SPORTS ---
        () => {
            const sports_facts = [
                { sport: 'soccer (football)', players: 11, fact: 'the most popular sport in the world with billions of fans' },
                { sport: 'basketball', players: 5, fact: 'invented by Dr. James Naismith in 1891 in the United States' },
                { sport: 'tennis', players: 1, fact: 'played on grass, clay, or hard courts in major tournaments called Grand Slams' },
                { sport: 'swimming', players: 1, fact: 'an Olympic sport since 1896 with multiple stroke styles like freestyle and butterfly' },
                { sport: 'cricket', players: 11, fact: 'extremely popular in countries like India, England, and Australia' },
                { sport: 'volleyball', players: 6, fact: 'played both indoors and on the beach as an Olympic sport' },
            ];
            const sf = faker.helpers.arrayElement(sports_facts);
            return {
                system_prompt: "You are a knowledgeable sports educator.",
                question: `How many players are on a ${sf.sport} team, and what makes it unique?`,
                answer: `A ${sf.sport} team has ${sf.players} player(s) on the field or court at a time. ${sf.sport.charAt(0).toUpperCase() + sf.sport.slice(1)} is ${sf.fact}.`
            };
        },
        () => {
            const olympic_sports = ['sprinting', 'gymnastics', 'weightlifting', 'archery', 'rowing', 'cycling', 'boxing', 'judo', 'wrestling', 'fencing'];
            const sport = faker.helpers.arrayElement(olympic_sports);
            const year = faker.number.int({ min: 1900, max: 2020 });
            return {
                system_prompt: "You are a sports history and Olympics expert.",
                question: `Is ${sport} an Olympic sport?`,
                answer: `Yes, ${sport} is an established Olympic sport. It has been part of the Olympic Games and requires years of dedicated training to compete at the international level.`
            };
        },

        // --- MONEY & EVERYDAY LIFE ---
        () => {
            const price = faker.number.int({ min: 50, max: 500 });
            const discount = faker.helpers.arrayElement([10, 15, 20, 25, 30]);
            const final = (price * (1 - discount / 100)).toFixed(2);
            return {
                system_prompt: "You are a practical everyday math helper.",
                question: `If a product costs $${price} and there is a ${discount}% discount, how much do you pay?`,
                answer: `With a ${discount}% discount on $${price}, you save $${(price * discount / 100).toFixed(2)}. So you would pay $${final} in total.`
            };
        },
        () => {
            const salary = faker.number.int({ min: 2000, max: 8000 });
            const tax = faker.helpers.arrayElement([15, 20, 25, 30]);
            const net = (salary * (1 - tax / 100)).toFixed(2);
            return {
                system_prompt: "You are a helpful personal finance advisor.",
                question: `If someone earns $${salary} per month before tax and their tax rate is ${tax}%, what is their net (take-home) pay?`,
                answer: `With a ${tax}% tax rate on a $${salary} monthly salary, the tax amount is $${(salary * tax / 100).toFixed(2)}. The take-home pay would be $${net} per month.`
            };
        },
        () => {
            const items = [
                { item: 'bread', tip: 'look for loaves with whole grains as the first ingredient for better nutrition' },
                { item: 'milk', tip: 'check the expiration date and keep refrigerated at or below 4°C' },
                { item: 'eggs', tip: 'check that none are cracked and store them in the fridge' },
                { item: 'fruits and vegetables', tip: 'choose seasonal produce for fresher taste and lower prices' },
                { item: 'cooking oil', tip: 'extra virgin olive oil is best for salads, while high-smoke-point oils are better for frying' },
            ];
            const it = faker.helpers.arrayElement(items);
            return {
                system_prompt: "You are a practical everyday life advisor.",
                question: `What should I look for when buying ${it.item} at the supermarket?`,
                answer: `When buying ${it.item}, ${it.tip}. Making informed choices at the grocery store leads to healthier eating and better value for money.`
            };
        },

        // --- TECHNOLOGY & GADGETS ---
        () => {
            const tech_terms = [
                { term: 'Wi-Fi', def: 'a wireless networking technology that allows devices to connect to the internet without physical cables' },
                { term: 'Bluetooth', def: 'a short-range wireless technology used to connect devices like headphones, keyboards, and phones' },
                { term: 'CPU', def: 'the Central Processing Unit — the main chip in a computer that processes instructions' },
                { term: 'RAM', def: 'Random Access Memory — temporary storage that your computer uses to run programs and tasks' },
                { term: 'SSD', def: 'Solid State Drive — a fast storage device with no moving parts, making it quicker than a traditional hard drive' },
                { term: 'cloud storage', def: 'a method of saving data on remote servers accessed via the internet, rather than on your local device' },
                { term: '4G', def: 'the fourth generation of mobile network technology, offering fast internet access on smartphones' },
                { term: 'GPS', def: 'Global Positioning System — a satellite-based navigation system that pinpoints your location anywhere on Earth' },
            ];
            const t = faker.helpers.arrayElement(tech_terms);
            return {
                system_prompt: "You are a friendly technology education expert.",
                question: `What is ${t.term} and what is it used for?`,
                answer: `${t.term} is ${t.def}. It is a widely used technology in modern everyday life.`
            };
        },
        () => {
            const social_platforms = [
                { name: 'Instagram', use: 'photo and video sharing, with a strong focus on visual content and stories' },
                { name: 'YouTube', use: 'video hosting and streaming, where creators upload content for billions of viewers' },
                { name: 'Twitter/X', use: 'short-form text posts (tweets) for news, opinions, and public conversations' },
                { name: 'LinkedIn', use: 'professional networking, job searching, and business connections' },
                { name: 'TikTok', use: 'short-form video content, known for viral trends and creative expression' },
                { name: 'WhatsApp', use: 'instant messaging, voice, and video calls with end-to-end encryption' },
            ];
            const sp = faker.helpers.arrayElement(social_platforms);
            return {
                system_prompt: "You are a social media and technology educator.",
                question: `What is ${sp.name} primarily used for?`,
                answer: `${sp.name} is primarily used for ${sp.use}. It is one of the most popular digital platforms globally.`
            };
        },

        // --- HEALTH & BODY ---
        () => {
            const exercises = [
                { ex: 'pushups', benefit: 'strengthen the chest, shoulders, and triceps without any equipment' },
                { ex: 'squats', benefit: 'build strength in the quadriceps, hamstrings, and glutes — the largest muscles in your body' },
                { ex: 'walking', benefit: 'improve cardiovascular health, mood, and calorie burning with minimal impact on joints' },
                { ex: 'plank', benefit: 'engage the entire core, building stability and reducing back pain' },
                { ex: 'running', benefit: 'strengthen the heart, burn calories, and improve endurance significantly' },
                { ex: 'yoga', benefit: 'improve flexibility, reduce stress, and increase body awareness and balance' },
            ];
            const e = faker.helpers.arrayElement(exercises);
            return {
                system_prompt: "You are a certified personal trainer and fitness educator.",
                question: `What are the health benefits of doing ${e.ex}?`,
                answer: `${e.ex.charAt(0).toUpperCase() + e.ex.slice(1)} are great because they ${e.benefit}. Incorporating this exercise into your routine can have significant long-term health benefits.`
            };
        },
        () => {
            const hydration_amount = faker.number.int({ min: 6, max: 10 });
            return {
                system_prompt: "You are a health and wellness expert.",
                question: `How much water should a person drink every day?`,
                answer: `Health experts generally recommend drinking about 8 glasses (approximately 2 liters) of water per day for the average adult. This can vary based on your weight, activity level, and climate. Staying hydrated supports kidney function, digestion, skin health, and energy levels.`
            };
        },
        () => {
            const sleep_hours = faker.number.int({ min: 7, max: 9 });
            return {
                system_prompt: "You are a health and sleep science expert.",
                question: `How many hours of sleep does an adult need per night?`,
                answer: `Adults typically need 7–9 hours of sleep per night. Quality sleep is essential for brain function, emotional regulation, immune health, and physical recovery. Consistently sleeping too little can increase the risk of obesity, heart disease, and mental health issues.`
            };
        },
        () => {
            const first_aid = [
                { situation: 'a minor cut', action: 'clean the wound with water, apply gentle pressure to stop bleeding, then cover with a clean bandage' },
                { situation: 'a burn', action: 'run cool (not cold) water over the burn for 10–20 minutes — do not use ice or butter' },
                { situation: 'a nosebleed', action: 'lean slightly forward, pinch the soft part of your nose firmly, and breathe through your mouth for 10 minutes' },
                { situation: 'a bee sting', action: 'remove the stinger by scraping (not squeezing), wash the area, and apply a cold pack to reduce swelling' },
                { situation: 'someone choking', action: 'perform the Heimlich maneuver by giving firm upward abdominal thrusts until the object is expelled' },
            ];
            const fa = faker.helpers.arrayElement(first_aid);
            return {
                system_prompt: "You are a certified first aid instructor.",
                question: `What should I do if someone has ${fa.situation}?`,
                answer: `If someone has ${fa.situation}, you should ${fa.action}. Knowing basic first aid can make a critical difference in an emergency.`
            };
        },

        // --- LANGUAGE & WORDS ---
        () => {
            const word_pairs = [
                { word: 'synonym', def: 'a word that has the same or nearly the same meaning as another word (e.g., happy and joyful)' },
                { word: 'antonym', def: 'a word that has the opposite meaning of another (e.g., hot and cold)' },
                { word: 'homophone', def: 'a word that sounds the same as another but has a different meaning and often spelling (e.g., "there" and "their")' },
                { word: 'metaphor', def: 'a figure of speech that describes something by saying it IS something else (e.g., "life is a journey")' },
                { word: 'simile', def: 'a comparison using "like" or "as" (e.g., "as brave as a lion")' },
                { word: 'idiom', def: 'a phrase whose meaning cannot be understood from the individual words (e.g., "break a leg" means good luck)' },
            ];
            const wp = faker.helpers.arrayElement(word_pairs);
            return {
                system_prompt: "You are an English language and grammar teacher.",
                question: `What is a ${wp.word} in language?`,
                answer: `A ${wp.word} is ${wp.def}. Understanding these linguistic concepts helps with reading, writing, and communication.`
            };
        },

        // --- TIME & CALENDAR ---
        () => {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            const idx = faker.number.int({ min: 0, max: 11 });
            return {
                system_prompt: "You are a helpful everyday calendar and time expert.",
                question: `How many days are in the month of ${months[idx]}?`,
                answer: `${months[idx]} has ${days[idx]} days${idx === 1 ? ' (29 days in a leap year)' : ''}. Knowing the number of days in each month helps with planning and scheduling.`
            };
        },
        () => {
            const timezones = [
                { city: 'New York', tz: 'Eastern Time (UTC-5 or UTC-4 during daylight saving)' },
                { city: 'London', tz: 'Greenwich Mean Time (UTC+0) or BST (UTC+1) in summer' },
                { city: 'Tokyo', tz: 'Japan Standard Time (UTC+9)' },
                { city: 'Sydney', tz: 'Australian Eastern Time (UTC+10 or UTC+11 in summer)' },
                { city: 'Dubai', tz: 'Gulf Standard Time (UTC+4)' },
                { city: 'Los Angeles', tz: 'Pacific Time (UTC-8 or UTC-7 during daylight saving)' },
            ];
            const tz = faker.helpers.arrayElement(timezones);
            return {
                system_prompt: "You are a travel and world time expert.",
                question: `What time zone is ${tz.city} in?`,
                answer: `${tz.city} is in the ${tz.tz}. Time zones help coordinate activities across the globe and are especially important for international travel and communication.`
            };
        },

        // --- EVERYDAY LOGIC & PRACTICAL KNOWLEDGE ---
        () => {
            const tips = [
                { task: 'remove a wine stain from fabric', tip: 'blot the stain (do not rub), then pour salt or club soda on it. Rinse with cold water and wash normally' },
                { task: 'unblock a sink', tip: 'try pouring baking soda followed by white vinegar, wait 15 minutes, then flush with hot water' },
                { task: 'keep bananas fresh longer', tip: 'wrap the stems in plastic wrap — this slows the release of ethylene gas that causes ripening' },
                { task: 'fall asleep faster', tip: 'try the 4-7-8 breathing method: inhale for 4 seconds, hold for 7, exhale for 8' },
                { task: 'remove bad smells from a refrigerator', tip: 'place an open box of baking soda inside — it absorbs odors naturally over time' },
                { task: 'save phone battery life', tip: 'lower screen brightness, turn off unused apps running in the background, and enable low-power mode' },
            ];
            const t = faker.helpers.arrayElement(tips);
            return {
                system_prompt: "You are a practical everyday life advisor full of useful tips.",
                question: `What is the best way to ${t.task}?`,
                answer: `To ${t.task}, ${t.tip}. These simple techniques save time and money without needing professional help.`
            };
        },
        () => {
            const conversions = [
                { from: '1 kilometer', to: '0.621 miles', context: 'useful when converting between metric and imperial distance units' },
                { from: '1 kilogram', to: '2.205 pounds', context: 'commonly needed when comparing weights across different systems' },
                { from: '1 liter', to: '0.264 US gallons', context: 'helpful when measuring liquid volumes internationally' },
                { from: '1 inch', to: '2.54 centimeters', context: 'used when converting heights, screen sizes, and measurements' },
                { from: '100 degrees Celsius (boiling point)', to: '212 degrees Fahrenheit', context: 'essential for cooking and science when switching between temperature scales' },
                { from: '0 degrees Celsius (freezing point)', to: '32 degrees Fahrenheit', context: 'important for weather forecasts and cooking conversions' },
            ];
            const c = faker.helpers.arrayElement(conversions);
            return {
                system_prompt: "You are a practical unit conversion expert.",
                question: `How many ${c.to.split(' ')[1] || 'units'} are in ${c.from}?`,
                answer: `${c.from} equals approximately ${c.to}. This conversion is ${c.context}.`
            };
        },

        // --- SPACE & ASTRONOMY ---
        () => {
            const space_facts = [
                { q: 'How far is the Moon from Earth?', a: 'The Moon is approximately 384,400 kilometers (238,855 miles) from Earth on average. This distance allowed astronauts to reach it in about 3 days during the Apollo missions.' },
                { q: 'How long does it take for light from the Sun to reach Earth?', a: 'Light from the Sun takes approximately 8 minutes and 20 seconds to travel the 150 million kilometers to Earth. This means we see the Sun as it was over 8 minutes ago.' },
                { q: 'How many moons does Jupiter have?', a: 'Jupiter has at least 95 known moons, including the four large Galilean moons (Io, Europa, Ganymede, and Callisto), making it the planet with the most moons in our solar system.' },
                { q: 'What is a light-year?', a: 'A light-year is the distance light travels in one year, which is approximately 9.46 trillion kilometers (5.88 trillion miles). It is used to measure vast distances in space.' },
                { q: 'What is the largest planet in our solar system?', a: 'Jupiter is the largest planet in our solar system. It is so large that more than 1,300 Earths could fit inside it. It is a gas giant with no solid surface.' },
                { q: 'Is the Sun a star?', a: 'Yes, the Sun is a star — specifically a medium-sized yellow dwarf star. It is the center of our solar system and provides the energy that supports all life on Earth.' },
            ];
            const sf = faker.helpers.arrayElement(space_facts);
            return {
                system_prompt: "You are an enthusiastic astronomy and space science educator.",
                question: sf.q,
                answer: sf.a
            };
        },

        // --- COLORS, SHAPES & ART ---
        () => {
            const color_mixes = [
                { a: 'red', b: 'blue', result: 'purple' },
                { a: 'blue', b: 'yellow', result: 'green' },
                { a: 'red', b: 'yellow', result: 'orange' },
                { a: 'red', b: 'white', result: 'pink' },
                { a: 'black', b: 'white', result: 'grey' },
                { a: 'all colors together (in light)', b: '', result: 'white (in light, subtractive mixing gives dark)' },
            ];
            const cm = faker.helpers.arrayElement(color_mixes.filter(c => c.b));
            return {
                system_prompt: "You are an art and color theory teacher.",
                question: `What color do you get when you mix ${cm.a} and ${cm.b}?`,
                answer: `Mixing ${cm.a} and ${cm.b} creates ${cm.result}. These are called secondary colors — formed by combining two primary colors.`
            };
        },
        () => {
            const shapes = [
                { shape: 'triangle', sides: 3, fact: 'the angles always add up to 180 degrees' },
                { shape: 'square', sides: 4, fact: 'all four sides are equal in length and all angles are 90 degrees' },
                { shape: 'pentagon', sides: 5, fact: 'the interior angles of a regular pentagon each measure 108 degrees' },
                { shape: 'hexagon', sides: 6, fact: 'honeycombs in beehives are famously hexagonal because of their efficient use of space' },
                { shape: 'octagon', sides: 8, fact: 'stop signs are octagonal — their unique shape makes them instantly recognizable even from the back' },
            ];
            const sh = faker.helpers.arrayElement(shapes);
            return {
                system_prompt: "You are a geometry teacher explaining shapes.",
                question: `How many sides does a ${sh.shape} have, and what is interesting about it?`,
                answer: `A ${sh.shape} has ${sh.sides} sides. Interestingly, ${sh.fact}.`
            };
        },

        // --- RANDOM TRIVIA VARIETY ---
        () => {
            const world_records = [
                { record: 'the tallest building in the world', holder: 'the Burj Khalifa in Dubai, standing at 828 meters' },
                { record: 'the longest river in the world', holder: 'the Nile River in Africa, stretching approximately 6,650 km' },
                { record: 'the largest ocean on Earth', holder: 'the Pacific Ocean, covering more than 165 million square kilometers' },
                { record: 'the highest mountain in the world', holder: 'Mount Everest in the Himalayas, at 8,849 meters above sea level' },
                { record: 'the driest desert in the world', holder: 'the Atacama Desert in Chile, receiving less than 1mm of rain per year' },
                { record: 'the most populated country in the world', holder: 'India, which surpassed China with over 1.4 billion people' },
            ];
            const wr = faker.helpers.arrayElement(world_records);
            return {
                system_prompt: "You are an engaging general knowledge expert.",
                question: `What is ${wr.record}?`,
                answer: `${wr.record.charAt(0).toUpperCase() + wr.record.slice(1)} is ${wr.holder}. This is one of the most well-known facts in world geography and trivia.`
            };
        },
        () => {
            const did_you_know = [
                'Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still edible.',
                'Octopuses have three hearts, blue blood (due to copper-based hemocyanin), and can change their color and texture in milliseconds.',
                'A bolt of lightning is five times hotter than the surface of the Sun, reaching around 30,000 Kelvin.',
                'Bananas are technically berries, but strawberries are not — botanically speaking.',
                'The Eiffel Tower grows about 15 cm taller in summer because heat causes the iron to expand.',
                'A group of flamingos is called a flamboyance.',
                'Humans share about 60% of their DNA with a banana plant.',
                'The Great Wall of China is NOT visible from space with the naked eye — this is a common myth.',
                'Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.',
                'Water can boil and freeze at the same time — this is called the "triple point" and occurs at exactly 0.01°C and 611.7 pascals.',
            ];
            const fact = faker.helpers.arrayElement(did_you_know);
            const idx2 = did_you_know.indexOf(fact);
            const questions = [
                'Is it true that honey never spoils?',
                'What makes octopuses biologically unique?',
                'How hot is a bolt of lightning?',
                'Are bananas actually classified as berries?',
                'Why does the Eiffel Tower change height?',
                'What is a group of flamingos called?',
                'How much DNA do humans share with bananas?',
                'Can you see the Great Wall of China from space?',
                'Who lived closer in time to the Moon landing — Cleopatra or the builders of the Great Pyramid?',
                'Can water boil and freeze at the same time?',
            ];
            return {
                system_prompt: "You are a fascinating science and trivia expert full of surprising facts.",
                question: questions[idx2] || 'Tell me an interesting everyday science fact.',
                answer: fact
            };
        },
    ]
};

/**
 * Generates an infinitely random, highly-unique Q&A pair using Faker.js templates.
 * @param allowedCategories Array of category keys to selectively pick from. If empty, picks from all.
 */
export function generateDynamicQA(allowedCategories: string[] = []): QAPair {
    let pool: QAGenerator[] = [];

    const keysToUse = allowedCategories.length > 0
        ? allowedCategories.filter(k => qaTemplates[k])
        : Object.keys(qaTemplates);

    // If somehow empty (invalid categories), fallback to general
    if (keysToUse.length === 0) {
        keysToUse.push('general_trivia');
    }

    // Collect all allowed templates
    for (const key of keysToUse) {
        pool.push(...qaTemplates[key]);
    }

    const generate = faker.helpers.arrayElement(pool);
    return generate();
}
