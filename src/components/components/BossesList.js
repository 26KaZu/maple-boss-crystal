import { Card, Select } from "@mantine/core";
import { bosses } from "../../boss";
import { browserLocalPersistence } from "firebase/auth";

export const WeeklyBosses = () => {
  //filter to weekly bosses
  const bossList = bosses.filter((boss) => boss.type.includes("weekly"));

  let renderedList = "";

  bossList.forEach((boss, i) => {
    const [partySize, setPartySize] = useState("");

    let bossCard = (
      <Card key={`boss-card-${i}`}>
        <Card.Section>{boss.name}</Card.Section>
        <Card.Section>{boss.price}</Card.Section>
        <Card.Section>
          <Select
            placeholder="Party Size"
            data={[
              { value: "1", lable: "1" },
              { value: "2", lable: "2" },
              { value: "3", lable: "3" },
              { value: "4", lable: "4" },
              { value: "5", lable: "5" },
              { value: "6", lable: "6" },
            ]}
          />
        </Card.Section>
        <Card.Section>
          <Switch />
        </Card.Section>
      </Card>
    );

    renderedList.push(bossCard);
  });

  return;
};
