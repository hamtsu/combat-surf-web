export const normalizeName = (subType: string, name: string) => {
    const value = subType ?? name;

    switch (value) {
        case "???":
            return "QuestionQuestionQuestion.png";
        case "AWP_#1":
            return "AWP_Number1.png";
        case "Shards_of_Creation":
            return "$Shards_of_Creation.gif";
        case "333":
            return "$333.gif";
        case "The_Dark_Arts":
            return "$The_Dark_Arts.gif";
        case "666":
            return "$666.gif";
        case "Ascendance.":
            return "$Ascendance.gif";
        case "The_Prince":
            return "$The_Prince.gif";
        case "Divinity.":
            return "$Divinity.gif";
        case "SoulStealer":
            return "$SoulStealer.gif";
        case "AWP_O":
            return "$AWP_O.gif";
        case "oldtier777":
            return "$oldtier777.gif";
        case "tier777":
            return "$tier777.gif";
        case "Esoteria":
            return "$Esoteria.gif";
        case "Pandoras_Box":
            return "$Pandoras_Box.gif";
        case "Divinity Lite":
            return "$Divinity_Lite.png";
        case "Acid Fang":
            return "$Acid_Fang.png";
        default:
            return checkNewGenImage(subType, name) ? `$${value}.png` : `${value}.png`;
    }
};

export const checkNewGenImage = (subType: string, name: string) => {
    const value = subType ?? name;
    const newGenItems = [
        "Shards_of_Creation",
        "333",
        "The_Dark_Arts",
        "666",
        "Ascendance.",
        "The_Prince",
        "Divinity.",
        "SoulStealer",
        "AWP_O",
        "oldtier777",
        "tier777",
        "Esoteria",
        "Pandoras_Box",
        "AWP_Limit",
        "AWP_FrostLore",
        "Dual_Katanas",
        "Turkey_Leg",
        "Yin_and_Yang",
        "Cyber_Katana",
        "AWP_Skelly",
        "AWP_Dreamless",
        "Glory",
        "AWP_Inf",
        "Dual_Ghosts",
        "AWP_Time",
        "AWP_DG",
        "Nightshade",
        "Dual_Gold_Katanas",
        "Peppermint_Punishers",
        "AWP_Maxwell",
        "AWP_Hitman",
        "AWP_Mclovin",
        "AWP_Vesly",
        "Duality",
        "AWP_Offline",
        "AWP_Infected",
        "AWP_Orchid",
        "AWP_Ego",
        "Tanto_RGB",
        "Karambit_Midnight",
        "Deagle_Blossom",
        "Katana_Midnight",
        "Butterfly_Midnight",
        "SpookyCase",
        "ChristmasPresent",
        "Butterfly_Bone",
        "Katana_Ghost",
        "Tanto_Sakura",
        "M9_Bayonet_Ghost",
        "Butterfly_Ice",
        "Combat_Knife",
        "Combat_Knife_Doppler",
        "M9_Bayonet_Festive",
        "Combat_Knife_Blackout",
        "Skeleton_Knife_Festive",
        "AWP_Strike",
        "AWP_Arctic_Wind",
        "WinCase4",
        "AWP_Penguin",
        "AWP_Warriors",
        "AWP_Dusk",
        "AWP_Scream",
        "AWP_Nova",
        "Deagle_Modern_Camo",
        "AWP_Wrapping3",
        "AWP_Lotus",
        "AWP_Mummy",
        "AWP_Luxery",
        "AWP_SandStorm",
        "AWP_Evergreen",
        "AWP_Treat",
        "AWP_SandStorm",
        "Deagle_Heatwave",
        "AWP_Whisp",
        "Glock_Wrapping",
        "Intervention",
        "UnityCase",
        "EventPackage",
        "AWP_Kawaii",
        "AWP_Graveyard",
        "AWP_Halloween2025",
        "Karambit_Festive2025",
        "AWP_Watching",
        "AWP_PumpkinMoon",
        "Deagle_Whiteout",
        "AWP_BloodShot",
        "AWP_Skullz",
        "AWP_Lana",
        "Divinity Lite",
        "Combat_Knife_Vanilla",
        "AWP_Hades",
        "AWP_Gradience",
        "Dual_Katana_Fades",
        "Balisong_Sapphire",
        "AWP_Teamwork",
        "AWP_Acid",
        "Katana_Teamwork",
        "Butterfly_Teamwork",
        "Combat_Knife_Teamwork",
        "Karambit_Teamwork",
        "Blood_Omen",
        "Skeleton_Knife_Teamwork",
        "Jkommando_Teamwork",
        "M9_Bayonet_Teamwork",
        "Bowie_Teamwork",
        "Butterfly_Stealth",
        "Karambit_Stealth",
        "Combat_Knife",
        "Friendship",
        "AWP_Lights",
        "AWP_Majesty",
        "Tanto_RGB",
        "Acid Fang",
        "AWP_Vines",
        "AWP_BlueJeans",
        "AWP_Kitsune",
        "AWP_Retribution",
        "AWP_Knight",
        "AWP_Royal",
        "Deagle_Spirit",
        "Deagle_Royal",
        "AWP_Whiteout",
        "AWP_Gingerbread",
        "Butterfly_Chomp",
        "M9_Bayonet_Ghost",
        "AWP_Horseman",
        "Deagle_Ak6ida",
        "AWP_Maxwell"
    ]

    return newGenItems.includes(value);
}