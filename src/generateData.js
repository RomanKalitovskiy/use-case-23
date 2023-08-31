import { faker } from "@faker-js/faker";

const titlesTitle = [
  "id",
  "title",
  "description",
  "release_year",
  "age_certification",
  "runtime",
  "genres",
  "production_country",
  "seasons",
];

const creditsTitle = ["id", "title_id", "real_name", "character_name", "role"];

const ageCertifications =
  "G, PG, PG-13, R, NC-17, U, U/A, A, S, AL, 6, 9, 12, 12A, 15, 18, 18R, R18, R21, M, MA15+, R16, R18+, X18, T, E, E10+, EC, C, CA, GP, M/PG, TV-Y, TV-Y7, TV-G, TV-PG, TV-14, TV-MA".split(
    ", "
  );

const roles =
  "Director, Producer, Screenwriter, Actor, Actress, Cinematographer, Film Editor, Production Designer, Costume Designer, Music Composer".split(
    ", "
  );

const getRandomString = (stringList) => {
  const randomIndex = faker.number.int({ min: 0, max: stringList.length - 1 });
  return stringList[randomIndex];
};

const generateCreditCSV = (id, title_id) => {
  return [
    id,
    title_id,
    faker.person.fullName(),
    faker.person.fullName(),
    getRandomString(roles),
  ];
};

const generateTitleCSV = (i) => {
  return [
    i,
    faker.lorem.words(),
    faker.lorem.paragraph(),
    faker.number.int({ min: -100, max: 2200 }),
    getRandomString(ageCertifications),
    faker.number.int({ min: -10, max: 300 }),
    `"${faker.lorem.words({ min: 1, max: 15 }).split(" ").join(", ")}"`,
    faker.location.countryCode(),
    faker.number.int({ min: 0, max: 15 }) || "",
  ];
};

const getGenerateCredits = () => {
  let creditId = 0;

  const generateCredits = (title_id) => {
    const credits = [];
    const numberOfCredits = faker.number.int({ min: 0, max: 15 });
    for (let creditIndex = 0; creditIndex < numberOfCredits; creditIndex++) {
      credits.push(generateCreditCSV(creditId++, title_id));
    }
    return credits;
  };
  return generateCredits;
};

const generateCredits = getGenerateCredits();

export const generateData = () => {
  const titles = [titlesTitle];
  const credits = [creditsTitle];

  const numberOfTitles = faker.number.int({ min: 100, max: 200 });

  for (let titleIndex = 0; titleIndex < numberOfTitles; titleIndex++) {
    titles.push(generateTitleCSV(titleIndex));
    credits.push(...generateCredits(titleIndex));
  }
  return [titles, credits];
};
