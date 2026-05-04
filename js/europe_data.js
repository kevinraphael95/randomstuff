const PARTIES = {
"FR": [
  { name: "La France Insoumise",    orient: "Extrême gauche", seats: 71,
    logo: "assets/logos_partis/fr/la-france-insoumise.svg" },
  { name: "Parti Communiste",       orient: "Extrême gauche", seats: 22,
    logo: "assets/logos_partis/fr/pcf.svg" },
  { name: "Les Écologistes",        orient: "Gauche",         seats: 38,
    logo: "assets/logos_partis/fr/europe-ecologie-les-verts.svg" },
  { name: "Parti Socialiste",       orient: "Centre gauche",  seats: 69,
    logo: "assets/logos_partis/fr/parti-socialiste.svg" },
  { name: "Renaissance",            orient: "Centre",         seats: 92,
    logo: "assets/logos_partis/fr/renaissance.svg" },
  { name: "MoDem",                  orient: "Centre",         seats: 36,
    logo: "assets/logos_partis/fr/mouvement-democrate.svg" },
  { name: "Horizons",               orient: "Centre droit",   seats: 29,
    logo: "assets/logos_partis/fr/horizons.svg" },
  { name: "Les Républicains",       orient: "Droite",         seats: 39,
    logo: "assets/logos_partis/fr/les-republicains.svg" },
  { name: "Rassemblement National", orient: "Extrême droite", seats: 126,
    logo: "assets/logos_partis/fr/rassemblement-national.svg" },
  { name: "Reconquête",             orient: "Extrême droite", seats: 16,
    logo: "assets/logos_partis/fr/reconquete.svg" },
],

"DE":[
  {"name":"Die Linke",                                      "orient":"Extrême gauche",      "seats":64,
   "logo":"assets/logos_partis/de/die_linke.png"},
  {"name":"Alternative 90 / Les Verts",                     "orient":"Centre gauche",       "seats":85,
   "logo":"assets/logos_partis/de/grunen.png"},
  {"name":"Parti Social Démocrate",                         "orient":"Centre gauche",       "seats":120,
   "logo":"assets/logos_partis/de/spd.png"},
  {"name":"Union Chrétienne Démocrate",                     "orient":"Centre droit",        "seats":208,
   "logo":"assets/logos_partis/de/cdu_csu.png"},
  {"name":"Alternative pour l'Allemagne",                   "orient":"Extrême droite",      "seats":152,
   "logo":"assets/logos_partis/de/reconquete.svg"},
  {"name":"Fédération des électeurs du Schleswig du Sud",   "orient":"Centre Gauche",       "seats":1,
  "logo":"assets/logos_partis/de/ssw.png"},
],

"ES": [
  { name: "Sumar",                                    orient: "Gauche",         seats: 31,
    logo: "assets/logos_partis/es/sumar.png" },
  { name: "PSOE",                                     orient: "Centre gauche",  seats: 121,
    logo: "assets/logos_partis/es/psoe.png" },
  { name: "Gauche républicaine de Catalogne",         orient: "Gauche",         seats: 7,
    logo: "assets/logos_partis/es/erc.png" },
  { name: "EH Bildu",                                 orient: "Gauche",         seats: 6,
    logo: "assets/logos_partis/es/eh bildu.png" },
  { name: "Parti nationaliste basque",                orient: "Centre",         seats: 5,
    logo: "assets/logos_partis/es/pnb.png" },
  { name: "Junts",                                    orient: "Centre droit",   seats: 7,
    logo: "assets/logos_partis/es/junts.png" },
  { name: "Union du peuple navarrais",                orient: "Droite",         seats: 1,
    logo: "assets/logos_partis/es/upn.png" },
  { name: "Parti Populaire",                          orient: "Droite",         seats: 137,
    logo: "assets/logos_partis/es/pp.png" },
  { name: "Vox",                                      orient: "Extrême droite", seats: 33,
    logo: "assets/logos_partis/es/vox.png" }
],

"PT":[
  {"name":"Bloco de Esquerda","orient":"Extrême gauche","seats":5,"logo":""},
  {"name":"PS","orient":"Centre gauche","seats":78,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Partido_Socialista_%28Portugal%29_logo.svg/120px-Partido_Socialista_%28Portugal%29_logo.svg.png"},
  {"name":"AD (PSD+CDS)","orient":"Centre droit","seats":80,"logo":""},
  {"name":"Chega","orient":"Extrême droite","seats":50,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chega_logo.svg/120px-Chega_logo.svg.png"}
],

"IT":[
  {"name":"Parti Democratique","orient":"Centre gauche","seats":69,
   "logo":"assets/logos_partis/it/pd.png"},
  {"name":"Movimento 5 Stelle","orient":"Centre","seats":52,"logo":"https://upload.wikimedia.org/wikipedia/it/thumb/e/e5/Movimento_5_Stelle_Logo_vettoriale.svg/120px-Movimento_5_Stelle_Logo_vettoriale.svg.png"},
  {"name":"Forza Italia","orient":"Centre droit","seats":45,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Forza_Italia_logo_%282013%29.svg/120px-Forza_Italia_logo_%282013%29.svg.png"},
  {"name":"Lega","orient":"Droite radicale","seats":66,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Logo_Lega_Salvini_Premier.svg/120px-Logo_Lega_Salvini_Premier.svg.png"},
  {"name":"Fratelli d'Italia","orient":"Droite radicale","seats":119,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Fratelli_d%27Italia_-_Logo_2022.svg/120px-Fratelli_d%27Italia_-_Logo_2022.svg.png"}
],

"UK":[
  {"name":"Labour","orient":"Centre gauche","seats":403,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Labour_Party_%28UK%29_logo.svg/120px-Labour_Party_%28UK%29_logo.svg.png"},
  {"name":"Conservative","orient":"Centre droit","seats":121,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Conservative_Party_%28UK%29_logo.svg/120px-Conservative_Party_%28UK%29_logo.svg.png"},
  {"name":"Liberal Democrats","orient":"Centre","seats":72,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Liberal_Democrats_%28UK%29_Logo.svg/120px-Liberal_Democrats_%28UK%29_Logo.svg.png"},
  {"name":"SNP","orient":"Régionaliste","seats":9,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/SNP_logo.svg/120px-SNP_logo.svg.png"},
  {"name":"Reform UK","orient":"Droite radicale","seats":5,"logo":"https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Reform_UK_logo.svg/120px-Reform_UK_logo.svg.png"}
],

"BE":[
  {"name":"PTB/PVDA","orient":"Extrême gauche","seats":15,"logo":""},
  {"name":"PS/Vooruit","orient":"Centre gauche","seats":29,"logo":""},
  {"name":"MR","orient":"Centre droit","seats":20,"logo":""},
  {"name":"N-VA","orient":"Centre droit","seats":24,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/N-VA_logo.svg/120px-N-VA_logo.svg.png"},
  {"name":"Vlaams Belang","orient":"Extrême droite","seats":20,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Vlaams_Belang_Logo.svg/120px-Vlaams_Belang_Logo.svg.png"}
],

"NL":[
  {"name":"GroenLinks/PvdA","orient":"Centre gauche","seats":25,"logo":""},
  {"name":"VVD","orient":"Centre droit","seats":24,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/VVD_Logo_2010.svg/120px-VVD_Logo_2010.svg.png"},
  {"name":"PVV","orient":"Extrême droite","seats":37,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/PVV_logo_%282023%29.svg/120px-PVV_logo_%282023%29.svg.png"}
],

"SE":[
  {"name":"Socialdemokraterna","orient":"Centre gauche","seats":107,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Sveriges_socialdemokratiska_arbetareparti_%28logotyp%2C_2016%29.svg/120px-Sveriges_socialdemokratiska_arbetareparti_%28logotyp%2C_2016%29.svg.png"},
  {"name":"Moderaterna","orient":"Centre droit","seats":68,"logo":""},
  {"name":"Sverigedemokraterna","orient":"Droite radicale","seats":73,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Sverigedemokraterna_logo.svg/120px-Sverigedemokraterna_logo.svg.png"}
],

"NO":[
  {"name":"Arbeiderpartiet","orient":"Centre gauche","seats":48,"logo":""},
  {"name":"Høyre","orient":"Centre droit","seats":36,"logo":""},
  {"name":"Fremskrittspartiet","orient":"Droite radicale","seats":21,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Fremskrittspartiet_logo.svg/120px-Fremskrittspartiet_logo.svg.png"}
],

"FI":[
  {"name":"SDP","orient":"Centre gauche","seats":43,"logo":""},
  {"name":"Kansallinen Kokoomus","orient":"Centre droit","seats":48,"logo":""},
  {"name":"Perussuomalaiset","orient":"Droite radicale","seats":46,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Perussuomalaiset.svg/120px-Perussuomalaiset.svg.png"}
],

"DK":[
  {"name":"Socialdemokraterne","orient":"Centre gauche","seats":50,"logo":""},
  {"name":"Venstre","orient":"Centre droit","seats":23,"logo":""},
  {"name":"Danmarks Demokraterne","orient":"Droite radicale","seats":14,"logo":""}
],

"PL":[
  {"name":"KO (PO)","orient":"Centre droit","seats":157,"logo":""},
  {"name":"PiS","orient":"Droite radicale","seats":194,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/PiS_logo.svg/120px-PiS_logo.svg.png"},
  {"name":"Konfederacja","orient":"Extrême droite","seats":18,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Konfederacja_logo_%282019%29.svg/120px-Konfederacja_logo_%282019%29.svg.png"}
],

"CZ":[
  {"name":"ANO","orient":"Centre","seats":72,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/ANO_2011_logo.svg/120px-ANO_2011_logo.svg.png"},
  {"name":"SPOLU","orient":"Centre droit","seats":71,"logo":""},
  {"name":"SPD","orient":"Droite radicale","seats":20,"logo":""},
  {"name":"Motoristé sobě","orient":"Droite","seats":9,"logo":""}
],

"AT":[
  {"name":"SPÖ","orient":"Centre gauche","seats":41,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Sozialdemokratische_Partei_%C3%96sterreichs_logo.svg/120px-Sozialdemokratische_Partei_%C3%96sterreichs_logo.svg.png"},
  {"name":"ÖVP","orient":"Centre droit","seats":52,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/%C3%96VP_-_Neue_Volkspartei_logo.svg/120px-%C3%96VP_-_Neue_Volkspartei_logo.svg.png"},
  {"name":"FPÖ","orient":"Extrême droite","seats":57,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/FP%C3%96_logo.svg/120px-FP%C3%96_logo.svg.png"}
],

"HU":[
  {"name":"TISZA","orient":"Centre droit","seats":34,"logo":""},
  {"name":"Fidesz-KDNP","orient":"Droite radicale","seats":135,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Fidesz_logo_%282020%29.svg/120px-Fidesz_logo_%282020%29.svg.png"}
],

"RO":[
  {"name":"PSD","orient":"Centre gauche","seats":122,"logo":""},
  {"name":"PNL","orient":"Centre droit","seats":71,"logo":""},
  {"name":"AUR","orient":"Extrême droite","seats":40,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/AUR_logo.svg/120px-AUR_logo.svg.png"}
],

"GR":[
  {"name":"SYRIZA","orient":"Gauche","seats":48,"logo":""},
  {"name":"PASOK","orient":"Centre gauche","seats":42,"logo":""},
  {"name":"Νέα Δημοκρατία","orient":"Centre droit","seats":158,"logo":""},
  {"name":"Ελληνική Λύση","orient":"Droite radicale","seats":12,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Elliniki_Lysi_logo.svg/120px-Elliniki_Lysi_logo.svg.png"}
],

"EE":[
  {"name":"Reformierakond","orient":"Centre droit","seats":37,"logo":""},
  {"name":"EKRE","orient":"Droite radicale","seats":17,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Eesti_Konservatiivne_Rahvaerakond_logo.svg/120px-Eesti_Konservatiivne_Rahvaerakond_logo.svg.png"}
],

"LV":[
  {"name":"JV","orient":"Centre droit","seats":26,"logo":""},
  {"name":"NA","orient":"Droite radicale","seats":13,"logo":""}
],

"LT":[
  {"name":"LSDP","orient":"Centre gauche","seats":52,"logo":""},
  {"name":"TS-LKD","orient":"Centre droit","seats":28,"logo":""},
  {"name":"Nemuno aušra","orient":"Droite radicale","seats":20,"logo":""}
],

"SK":[
  {"name":"Smer-SD","orient":"Centre gauche","seats":42,"logo":""},
  {"name":"Republika","orient":"Extrême droite","seats":10,"logo":""}
],

"HR":[
  {"name":"HDZ","orient":"Centre droit","seats":61,"logo":""},
  {"name":"Domovinski pokret","orient":"Droite radicale","seats":14,"logo":""}
],

"SI":[
  {"name":"Gibanje Svoboda","orient":"Centre","seats":41,"logo":""},
  {"name":"SDS","orient":"Centre droit","seats":27,"logo":""}
],

"BA":[
  {"name":"SDA","orient":"Centre droit","seats":11,"logo":""},
  {"name":"SNSD","orient":"Droite radicale","seats":6,"logo":""}
],

"RS":[
  {"name":"SNS","orient":"Centre droit","seats":129,"logo":""},
  {"name":"Zavetnici","orient":"Droite radicale","seats":11,"logo":""}
],

"BG":[
  {"name":"GERB","orient":"Centre droit","seats":69,"logo":""},
  {"name":"Vazrazhdane","orient":"Extrême droite","seats":38,"logo":""}
],

"CH":[
  {"name":"SP","orient":"Centre gauche","seats":41,"logo":""},
  {"name":"FDP","orient":"Centre droit","seats":28,"logo":""},
  {"name":"SVP","orient":"Droite radicale","seats":62,"logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/SVP_logo.svg/120px-SVP_logo.svg.png"}
],

"IE":[
  {"name":"Sinn Féin","orient":"Centre gauche","seats":39,"logo":""},
  {"name":"Fianna Fáil","orient":"Centre","seats":48,"logo":""},
  {"name":"Fine Gael","orient":"Centre droit","seats":38,"logo":""}
],

"IS":[
  {"name":"Samfylkingin","orient":"Centre gauche","seats":15,"logo":""},
  {"name":"Sjálfstæðisflokkur","orient":"Centre droit","seats":16,"logo":""}
],

"MK":[
  {"name":"VMRO-DPMNE","orient":"Droite radicale","seats":58,"logo":""}
],

"ME":[
  {"name":"Europe Now","orient":"Centre droit","seats":25,"logo":""},
  {"name":"DF","orient":"Droite radicale","seats":13,"logo":""}
],

"AL":[
  {"name":"PS","orient":"Centre gauche","seats":82,"logo":""},
  {"name":"PD","orient":"Centre droit","seats":55,"logo":""}
],

"UA":[
  {"name":"Sluha Narodu","orient":"Centre","seats":232,"logo":""}
],

"MD":[
  {"name":"PAS","orient":"Centre droit","seats":63,"logo":""},
  {"name":"PSRM","orient":"Centre gauche","seats":32,"logo":""}
],

"BY":[
  {"name":"Belaya Rus","orient":"Autre","seats":79,"logo":""}
],

"LU":[
  {"name":"CSV","orient":"Centre droit","seats":21,"logo":""},
  {"name":"DP","orient":"Centre","seats":14,"logo":""},
  {"name":"LSAP","orient":"Centre gauche","seats":11,"logo":""}
],

};

const COUNTRY_NAMES = 
{"FR":"🇫🇷 France","DE":"🇩🇪 Allemagne","ES":"🇪🇸 Espagne","PT":"🇵🇹 Portugal","IT":"🇮🇹 Italie","UK":"🇬🇧 Royaume-Uni","BE":"🇧🇪 Belgique",
"NL":"🇳🇱 Pays-Bas","SE":"🇸🇪 Suède","NO":"🇳🇴 Norvège","FI":"🇫🇮 Finlande","DK":"🇩🇰 Danemark","PL":"🇵🇱 Pologne","CZ":"🇨🇿 Tchéquie",
"AT":"🇦🇹 Autriche","HU":"🇭🇺 Hongrie","RO":"🇷🇴 Roumanie","HR":"🇭🇷 Croatie","RS":"🇷🇸 Serbie","GR":"🇬🇷 Grèce","EE":"🇪🇪 Estonie",
"LV":"🇱🇻 Lettonie","LT":"🇱🇹 Lituanie","BG":"🇧🇬 Bulgarie","AL":"🇦🇱 Albanie","CH":"🇨🇭 Suisse","IE":"🇮🇪 Irlande","IS":"🇮🇸 Islande",
"SK":"🇸🇰 Slovaquie","SI":"🇸🇮 Slovénie","BA":"🇧🇦 Bosnie","MK":"🇲🇰 Macédoine","ME":"🇲🇪 Monténégro","UA":"🇺🇦 Ukraine","MD":"🇲🇩 Moldavie",
"BY":"🇧🇾 Biélorussie","LU":"🇱🇺 Luxembourg"};

const ORIENT_COLOR = 
{"Extrême gauche":"#c00",
  "Gauche":"#e05",
  "Centre gauche":"#e84",
  "Centre":"#aa0",
  "Centre droit":"#46a",
  "Droite":"#338",
  "Droite radicale":"#226",
  "Extrême droite":"#800",
  "Régionaliste":"#2a2","Autre":"#888"}
