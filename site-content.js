'use strict';
// Populate the release only when a real game file is supplied.
window.SHAMAGON_RELEASE = { url: '', fileName: '', version: '' };
window.SHAMAGON_CHARACTERS = [
  {
    "id": "kairo",
    "name": "KAIRO",
    "className": "SAMURAI",
    "age": 14,
    "color": "#d49a3d",
    "spirit": "STILL LOOKING TOWARD TOMORROW",
    "line": "Brave, bright and determined to keep moving.",
    "description": "An energetic, optimistic samurai who refuses to let the loss of his family take away his courage. Kairo meets the next fight with a katana and a belief that tomorrow can be better.",
    "ability": "INCREASED HEALTH",
    "abilityText": "Kairo has more health, giving him greater endurance in battle.",
    "icon": "heart",
    "sprite": "assets/samurai-about/presenting.webp",
    "anime": "assets/anime/kairo-chibi.webp",
    "frames": [
      "assets/samurai-about/standing-00.webp",
      "assets/samurai-about/standing-01.webp",
      "assets/samurai-about/standing-02.webp",
      "assets/samurai-about/standing-03.webp",
      "assets/samurai-about/standing-04.webp",
      "assets/samurai-about/standing-05.webp",
      "assets/samurai-about/standing-06.webp",
      "assets/samurai-about/standing-07.webp",
      "assets/samurai-about/standing-08.webp",
      "assets/samurai-about/standing-09.webp",
      "assets/samurai-about/standing-10.webp",
      "assets/samurai-about/standing-11.webp",
      "assets/samurai-about/standing-12.webp",
      "assets/samurai-about/standing-13.webp",
      "assets/samurai-about/standing-14.webp",
      "assets/samurai-about/standing-15.webp",
      "assets/samurai-about/standing-16.webp",
      "assets/samurai-about/standing-17.webp",
      "assets/samurai-about/standing-18.webp",
      "assets/samurai-about/standing-19.webp",
      "assets/samurai-about/standing-20.webp",
      "assets/samurai-about/standing-21.webp",
      "assets/samurai-about/standing-22.webp",
      "assets/samurai-about/standing-23.webp"
    ],
    "frameSize": [
      512,
      640
    ],
    "transition": "slash",
    "personalityLabel": "PERSONALITY",
    "personality": "Brave, full of energy and genuinely optimistic. Kairo brings an open, hopeful spirit to a crew shaped by difficult pasts.",
    "traits": [
      "Brave",
      "Energetic",
      "Optimistic"
    ],
    "originTitle": "THE TEMPLE HE LOST",
    "origin": [
      "Kairo was born into a family of samurai and learned their way of the blade. At ten, his life changed when a spiritual anomaly reached the family temple. Spirits attacked, killing everyone inside. Kairo managed to escape.",
      "He has lived on the streets since that day. The loss never erased his courage or his optimism: the fourteen-year-old samurai still faces the world with energy and hope."
    ]
  },
  {
    "id": "ash",
    "name": "ASH",
    "className": "ASSASSIN",
    "age": 15,
    "color": "#b64b55",
    "spirit": "QUIET. PRECISE. UNWAVERING.",
    "line": "He says little. Every move has a purpose.",
    "description": "A half-elf assassin with a reserved nature and quiet confidence. Ash is sharp and intensely focused, pairing his speed with attacks that strike twice.",
    "ability": "DOUBLE STRIKE",
    "abilityText": "Every attack hits twice. Ash pairs his double strikes with a fast fighting style.",
    "icon": "blades",
    "sprite": "assets/assassin-ready.webp",
    "anime": "assets/anime/ash-chibi.webp",
    "frames": [
      "assets/idle-00.webp",
      "assets/idle-01.webp",
      "assets/idle-02.webp",
      "assets/idle-03.webp",
      "assets/idle-04.webp",
      "assets/idle-05.webp",
      "assets/idle-06.webp",
      "assets/idle-07.webp",
      "assets/idle-08.webp",
      "assets/idle-09.webp",
      "assets/idle-10.webp",
      "assets/idle-11.webp",
      "assets/idle-12.webp",
      "assets/idle-13.webp",
      "assets/idle-14.webp",
      "assets/idle-15.webp",
      "assets/idle-16.webp",
      "assets/idle-17.webp",
      "assets/idle-18.webp",
      "assets/idle-19.webp",
      "assets/idle-20.webp",
      "assets/idle-21.webp",
      "assets/idle-22.webp",
      "assets/idle-23.webp"
    ],
    "frameSize": [
      640,
      640
    ],
    "transition": "dagger",
    "personalityLabel": "PERSONALITY",
    "personality": "Quiet, introverted, sharp and driven. His confidence is understated; he does not need to raise his voice to make his presence felt.",
    "traits": [
      "Reserved",
      "Focused",
      "Quietly confident"
    ],
    "originTitle": "BETWEEN TWO WORLDS",
    "origin": [
      "Ash is the child of a human father and an elven spirit mother. When the elven king discovered their relationship, he killed Ash’s father and forced his mother back into the spirit world, far beyond her son’s reach.",
      "Ash was six. Left on the streets, he was never quite the same. Now fifteen, he keeps his feelings close and moves forward with a precise, unwavering sense of purpose."
    ]
  },
  {
    "id": "stella",
    "name": "STELLA",
    "className": "MAGE",
    "age": 14,
    "color": "#4cabc0",
    "spirit": "WARMTH BEHIND THE SHIELD",
    "line": "A hopeful heart. A protective kind of magic.",
    "description": "An optimistic young mage with a gentle, caring presence. Stella brings warmth to the crew, while her double-defense ability gives her magic a protective role in battle.",
    "ability": "DOUBLE DEFENSE",
    "abilityText": "Stella’s protective ability provides double defense.",
    "icon": "shield",
    "sprite": "assets/mage-guide/pose-00.webp",
    "anime": "assets/anime/stella-chibi.webp",
    "frames": [
      "assets/mage-guide/pose-00.webp",
      "assets/mage-guide/pose-01.webp"
    ],
    "frameSize": [
      512,
      512
    ],
    "transition": "magic",
    "personalityLabel": "PERSONALITY",
    "personality": "Warm, optimistic and caring, with a naturally nurturing side. Her softness and femininity sit alongside the strength that once saved her life.",
    "traits": [
      "Optimistic",
      "Caring",
      "Nurturing"
    ],
    "originTitle": "THE ONLY SURVIVOR",
    "origin": [
      "Stella was born into a wealthy family. When her parents discovered her powers, they began using them to make money. It ended when an attack destroyed their building.",
      "Her powers protected her, making Stella the only survivor. She was left to live on the streets, but the experience did not take away the warmth and optimism she now brings to the group."
    ]
  },
  {
    "id": "violet",
    "name": "VIOLET",
    "className": "ARCHER",
    "age": 16,
    "color": "#9161bf",
    "spirit": "A QUIET HEART. A TRUE AIM.",
    "line": "A skilled archer still learning to believe in herself.",
    "description": "Very shy and easily embarrassed, Violet has far less confidence in herself than her skill with a bow deserves. Beneath that hesitation lies the immense power that once saved her life.",
    "ability": "WEAKEN",
    "abilityText": "Violet can weaken enemies, reducing their strength in battle.",
    "icon": "arrow",
    "sprite": "assets/archer/idle.webp",
    "anime": "assets/anime/violet-chibi.webp",
    "frames": [
      "assets/archer/idle-00.webp",
      "assets/archer/idle-01.webp",
      "assets/archer/idle-02.webp",
      "assets/archer/idle-03.webp",
      "assets/archer/idle-04.webp",
      "assets/archer/idle-05.webp",
      "assets/archer/idle-06.webp",
      "assets/archer/idle-07.webp",
      "assets/archer/idle-08.webp",
      "assets/archer/idle-09.webp",
      "assets/archer/idle-10.webp",
      "assets/archer/idle-11.webp",
      "assets/archer/idle-12.webp",
      "assets/archer/idle-13.webp",
      "assets/archer/idle-14.webp",
      "assets/archer/idle-15.webp",
      "assets/archer/idle-16.webp",
      "assets/archer/idle-17.webp",
      "assets/archer/idle-18.webp",
      "assets/archer/idle-19.webp",
      "assets/archer/idle-20.webp",
      "assets/archer/idle-21.webp",
      "assets/archer/idle-22.webp",
      "assets/archer/idle-23.webp"
    ],
    "frameSize": [
      512,
      640
    ],
    "transition": "arrow",
    "personalityLabel": "PERSONALITY",
    "personality": "Very shy, easily flustered and unsure of herself. She is also in love with Ash, a feeling that adds another layer to her quiet, easily embarrassed nature.",
    "traits": [
      "Shy",
      "Easily embarrassed",
      "In love with Ash"
    ],
    "originTitle": "WHEN THE VILLAGE FELL",
    "origin": [
      "Violet grew up in a poor village, in a family of hunters. She loved her parents and younger siblings, and became a talented archer despite her shyness and lack of confidence.",
      "When she was twelve, an anomaly unleashed powerful monsters in the village. They killed her parents and her younger siblings. Facing death herself, Violet released an immense burst of power that destroyed the attacking creatures. Then she collapsed.",
      "Afterward, she found herself living on the streets. Now sixteen, she carries both her skill with a bow and the memory of a power that emerged at her darkest moment."
    ]
  },
  {
    "id": "blaze",
    "name": "BLAZE",
    "className": "PYROMANCER",
    "age": 17,
    "color": "#d66434",
    "spirit": "A WILD FLAME. A BETTER CHOICE.",
    "line": "Cocky, sarcastic and far too alive to stay quiet.",
    "description": "A proud, unruly pyromancer with a sharp tongue and a real love of life. Blaze once used fire however he pleased; now he is trying to turn that freedom toward doing good.",
    "ability": "EVERBURN",
    "abilityText": "Blaze continuously burns his enemies with an unrelenting flame.",
    "icon": "fire",
    "sprite": "assets/blaze/idle.webp",
    "anime": "assets/anime/blaze-chibi.webp",
    "frames": [
      "assets/blaze/idle-00.webp",
      "assets/blaze/idle-01.webp",
      "assets/blaze/idle-02.webp",
      "assets/blaze/idle-03.webp",
      "assets/blaze/idle-04.webp",
      "assets/blaze/idle-05.webp",
      "assets/blaze/idle-06.webp",
      "assets/blaze/idle-07.webp",
      "assets/blaze/idle-08.webp",
      "assets/blaze/idle-09.webp",
      "assets/blaze/idle-10.webp",
      "assets/blaze/idle-11.webp",
      "assets/blaze/idle-12.webp",
      "assets/blaze/idle-13.webp",
      "assets/blaze/idle-14.webp",
      "assets/blaze/idle-15.webp",
      "assets/blaze/idle-16.webp",
      "assets/blaze/idle-17.webp",
      "assets/blaze/idle-18.webp",
      "assets/blaze/idle-19.webp",
      "assets/blaze/idle-20.webp",
      "assets/blaze/idle-21.webp",
      "assets/blaze/idle-22.webp",
      "assets/blaze/idle-23.webp"
    ],
    "frameSize": [
      512,
      640
    ],
    "transition": "fire",
    "personalityLabel": "PERSONALITY",
    "personality": "Sarcastic, proud, wild and full of life. His irreverent humor and swagger do not cancel out his growing desire to use his power for something better.",
    "traits": [
      "Sarcastic",
      "Proud",
      "Wild & lively"
    ],
    "originTitle": "RAISED BY THE STREET",
    "origin": [
      "Blaze has been an orphan since birth and knows nothing about his family. At six, he discovered his powers and began using them however he wanted — sometimes selfishly, sometimes for things he would later recognize as wrong.",
      "Growing up changed his outlook. He decided his fire should be used for good, and now tries to help people on the streets that raised him. At seventeen, he is still every bit as wild, sarcastic and proud."
    ]
  },
  {
    "id": "layla",
    "name": "LAYLA",
    "className": "VAMPIRE",
    "age": 18,
    "color": "#b94470",
    "spirit": "BLOOD DOES NOT MAKE THE CHOICE.",
    "line": "Her father chose revenge. She still cares about humanity.",
    "description": "The daughter of a vampire spirit and a human mother, Layla lives between two worlds. Her connection to humanity may one day force her to confront the father she has already lost in another way.",
    "ability": "LIFE DRAIN",
    "abilityText": "Layla drains life from her enemies to replenish her own.",
    "icon": "drop",
    "sprite": "assets/layla-guide/pose-00.webp",
    "anime": "assets/anime/layla-chibi-fangs.webp",
    "frames": [
      "assets/layla-guide/pose-00.webp",
      "assets/layla-guide/pose-01.webp"
    ],
    "frameSize": [
      512,
      512
    ],
    "transition": "whip",
    "personalityLabel": "INNER CONFLICT",
    "personality": "Her father demands that she choose a side. Layla hesitated because part of her still loves humanity. Continuing to fight spirits may eventually mean facing him.",
    "traits": [
      "Human & vampire heritage",
      "A divided family",
      "An unresolved choice"
    ],
    "originTitle": "BLOOD AND BELONGING",
    "origin": [
      "Layla’s father was a vampire spirit. He transformed her human mother into a vampire; they fell in love and had Layla. The official agency later killed her mother, believing she was a spirit.",
      "Her father swore revenge. He killed many agency members and remains at large. He told Layla he did not want her involved in his vengeance. He also could not accept her love for humanity and demanded that she choose a side.",
      "When Layla hesitated, he rejected her as his daughter and cut off contact. Now eighteen, she knows that continuing to fight spirits could one day bring her face to face with him."
    ]
  }
];
