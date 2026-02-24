import { world, system } from "@minecraft/server";
import { ActionFormData, MessageFormData } from "@minecraft/server-ui";

const CATEGORIES = {
    "基础物品": { icon: "textures/items/salt", items: {
        "盐和盐块": { icon: "textures/items/salt", desc: "食用盐.通过开采盐矿、熔炼获得，或由大多数水下生物掉落.", obtain: "盐矿石（直接掉落盐，无需时运）.也可以冶炼盐矿石.从一桶盐制作.大多数水下怪物掉落..", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[一桶盐][ ][ ]\n[ ][ ][ ]\n[ ][ ][ ]\n§7= 盐 x9 + 水桶 x1§r", related: [
            { name: "盐矿", icon: "textures/blocks/salt_ore", desc: "含有盐矿的矿石块.开采时掉落盐（不需要时之触）.也可以熔炼.", obtain: "生成于高度 Y=0 到 Y=160 之间的所有主世界地形中.需要任何镐.可与时运和精准采集效果一起使用.", hunger: null, saturation: null, recipe: "§l§6Smelting:§r §7 熔炉/Blast Furnace§r\nSalt Ore -> Salt" },
            { name: "深板盐矿", icon: "textures/blocks/deepslate_salt_ore", desc: "深板岩层中的盐矿石.开采时会掉落盐.也可以冶炼..", obtain: "生成在所有主世界生物群系中 Y=0 以下的深板岩中.需要任何镐.可与幸运附魔和精准采集附魔一起使用.", hunger: null, saturation: null, recipe: "§l§6冶炼:§r §7熔炉/高炉§r\n深板岩盐矿 -> 盐" },
            { name: "盐块", icon: "textures/blocks/salt_block", desc: "一块压实的盐块.", obtain: "在3x3格子中放置9个盐. 可逆（盐块 -> 盐 x9）.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[盐][盐][盐]\n[盐][盐][盐]\n[盐][盐][盐]\n§7= 盐块 x1§r" },
            { name: "一桶盐", icon: "textures/items/bucket_of_salt", desc: "一桶装满盐晶的桶.", obtain: "在熔炉/熏炉中熔炼一个水桶.", hunger: null, saturation: null, recipe: "§l§6冶炼:§r §7炉/烟熏炉§r\n水桶 -> 一桶盐" }
        ]},
        "熟米饭": { icon: "textures/items/prepared_rice", desc: "熟米饭，可用于各种食谱.", obtain: "生米 x8   在工作台中放入水桶.", hunger: "2 (1 胫骨)", saturation: "1.2 (正常)", other: "30% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[生米][生米][生米]\n[生米][水桶][生米]\n[生米][生米][生米]\n§7= 熟米饭 x8 + 水桶 x1§r" },
        "拉面": { icon: "textures/items/ramen_noodles", desc: "用于制作拉面的干面条.不可食用.", obtain: "小麦 x1 (不成形的).", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台 (不定型的)§r\n[小麦]\n§7= 拉面 x3§r" },
        "黄油": { icon: "textures/items/butter", desc: "用牛奶制成的奶油黄油.不可食用.", obtain: "奶桶 x1.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[奶桶][ ][ ]\n[ ][ ][ ]\n[ ][ ][ ]\n§7= 黄油 x4 + 水桶 x1§r" },
        "钢碗": { icon: "textures/items/steel_bowl", desc: "一个坚固的钢碗.不可食用.用于制作炖菜.", obtain: "铁锭 x4.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[铁锭][铁锭][铁锭]\n[ ][铁锭][ ]\n[ ][ ][ ]\n§7= 钢碗 x1§r" },
        "玻璃牛奶瓶": { icon: "textures/items/glass_milk_bottle", desc: "一个空玻璃瓶用于盛牛奶.不可食用.可以直接给牛挤奶.", obtain: "玻璃板 x2 + 玻璃 x1.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[玻璃板][ ][玻璃板]\n[ ][玻璃][ ]\n[ ][ ][ ]\n§7= 玻璃牛奶瓶 x3§r" },
        "空罐": { icon: "textures/items/empty_jar", desc: "一个空玻璃罐.不可食用.用于制作果冻.", obtain: "玻璃板 x3.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[玻璃板][ ][玻璃板]\n[ ][玻璃板][ ]\n[ ][ ][ ]\n§7= 空罐 x3§r" },
        "橡实": { icon: "textures/items/acorn", desc: "来自橡树的小橡果.不可食用.可用于巧克力坚果蛋糕中.", obtain: "来自橡树叶破碎的掉落物.", hunger: null, saturation: null, other: "30% 堆肥几率" },
        "松果": { icon: "textures/items/pine_cone", desc: "一颗云杉的松果.不可食用.暂时没有用途.", obtain: "从破碎的云杉叶中掉落.", hunger: null, saturation: null, other: "30% 堆肥几率" },
        "肉桂": { icon: "textures/items/cinnamon", desc: "一根肉桂树皮.不可食用.", obtain: "破坏未剥皮的丛林原木有1/16的掉落几率.", hunger: null, saturation: null, other: "30% 堆肥几率" },
        "明胶": { icon: "textures/items/gelatin", desc: "一种固化剂.不可食用.除了制作之外暂无其他用途.", obtain: "熔炼一根骨头.", hunger: null, saturation: null, recipe: "§l§6冶炼:§r §7 熔炉/烟熏炉/营火/灵魂营火§r\n骨 -> 胶原蛋白" },
        "鱼子酱": { icon: "textures/items/salmon_roe", desc: "小型橙色鱼卵.用于寿司.吃得比平常快两倍.", obtain: "用生三文鱼制作.同时也是三文鱼死亡时的稀有掉落物.", hunger: "1（0.5点）", saturation: "0.6 (低)", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[生三文鱼]\n§7= 鱼子酱 x3§r" },
        "火鸡羽毛": { icon: "textures/items/turkey_feather", desc: "一根火鸡羽毛.不可食用.可以替换箭矢、刷子和可写书籍的羽毛食谱.", obtain: "在土耳其被黑帮杀害.", hunger: null, saturation: null },
        "火鸡蛋": { icon: "textures/items/turkey_egg", desc: "火鸡下的蛋.不可食用.可以投掷或在任何食谱中作为鸡蛋使用.投掷时有几率孵出小火鸡.", obtain: "周期性地被土耳其黑帮袭击.", hunger: null, saturation: null },
        "指南": { icon: "textures/items/guidebook/guidebook", desc: "食品扩展插件的游戏内百科.你正在阅读它！", obtain: "书 + 蓝色染料（无特定摆放）.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[书] + [蓝色染料]\n§7= 指南 x1§r" }
    }},

    "寿司卷": { icon: "textures/items/salmon_roll", items: {
        "三文鱼卷": { icon: "textures/items/salmon_roll", desc: "经典寿司卷，内有新鲜三文鱼和米饭，用海苔包裹.", obtain: "熟米饭 + 生三文鱼 + 干海带.", hunger: "6 (3 点)", saturation: "1.6 (好)", recipe: "§l§6食谱:§r §7工作台§r\n[熟米饭][生三文鱼][干海带]\n§7= 三文鱼卷 x1§r" },
        "煎蛋寿司": { icon: "textures/items/fried_egg_sushi", desc: "一个简单的寿司，上面放着一颗蓬松的煎蛋.", obtain: "干海带 + 煎蛋 + 预制米饭", hunger: "6 (3 点)", saturation: "1.6 (好)", recipe: "§l§6食谱:§r §7工作台§r\n[干海带][煎蛋][熟米饭]\n§7= 煎蛋寿司 x1§r" },
        "鱼子酱军舰卷": { icon: "textures/items/salmon_roe_gunkan", desc: "军舰寿司，里面填满了亮橙色的鱼子酱.", obtain: "干海带, 鱼子酱, 熟米饭.", hunger: "4 (2 点)", saturation: "2.0 (好+)", recipe: "§l§6食谱:§r §7工作台§r\n[干海带][ ]\n[鱼子酱][熟米饭]\n§7= 鱼子酱军舰卷 x1§r" },
        "三文鱼卷": { icon: "textures/items/salmon_wrapped_roll", desc: "用薄生三文鱼片包裹的寿司饭.", obtain: "生三文鱼 x3, 熟米饭，海带.", hunger: "8 (4 点)", saturation: "1.6 (好)", recipe: "§l§6食谱:§r §7工作台§r\n[生三文鱼][生三文鱼][生三文鱼]\n[ ][熟米饭][ ]\n[ ][海带][ ]\n§7=三文鱼卷 x1§r" },
        "鸡肉卷": { icon: "textures/items/chicken_roll", desc: "一整卷寿司，里面填满了调味鸡肉.可以切片.", obtain: "干昆布+ 米饭 + 熟鸡肉(无特定摆放).", hunger: "6 (3 点)", saturation: "1.2 (Normal)", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[干海带] + [熟米饭] + [熟鸡肉]\n§7= 鸡肉卷 x1§r" },
        "鸡肉卷片": { icon: "textures/items/chicken_roll_slice", desc: "一片填有熟鸡肉的寿司卷.(无特定摆放) -> 鸡肉卷片 x3.", hunger: "2 (1 点)", saturation: "1.2 (正常)", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[鸡肉卷]\n§7= 鸡肉卷片 x3§r" },
        "绿茶卷": { icon: "textures/items/midori_roll", desc: "一卷绿色寿司卷，内含三文鱼和西葫芦.可以切片.", obtain: "干海带+ 米饭 + 生三文鱼 + 西葫芦 (无特定摆放).", hunger: "6 (3 点)", saturation: "1.2 (正常)", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[干海带] + [熟米饭] + [生三文鱼] + [西葫芦]\n§7= 绿茶卷 x1§r" },
        "绿茶卷切片": { icon: "textures/items/midori_roll_slice", desc: "一片绿色主题的寿司卷. 吃得快了两倍.", obtain: "绿茶卷(无特定摆放) -> 绿茶卷切片 x3.", hunger: "2 (1 点)", saturation: "1.2 (Normal)", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[绿茶卷]\n§7= 绿茶卷切片 x3§r" },
        "蔬菜卷": { icon: "textures/items/vegetable_roll", desc: "一份新鲜的蔬菜卷，里面有胡萝卜和绿叶菜.", obtain: "熟米饭 + 干海带 + 胡萝卜.", hunger: "4 (2 点)", saturation: "1.6 (好)", recipe: "§l§6食谱:§r §7工作台§r\n[熟米饭][干海带][胡萝卜]\n§7= 蔬菜卷 x1§r" },
        "甜菜寿司卷": { icon: "textures/items/beet_sushi_roll", desc: "一道充满活力的卷，配有腌甜菜根.", obtain: "Prepared Rice + Beetroot + Dried Kelp.", hunger: "4 (2 点)", saturation: "1.6 (Good)", recipe: "§l§6食谱:§r §7工作台§r\n[熟米饭][甜菜][干海带]\n§7= 甜菜寿司卷 x1§r" },
        "鳕鱼卷": { icon: "textures/items/cod_roll", desc: "一种口味清淡、夹有酥脆鳕鱼的卷饼.", obtain: "熟米饭 + 生鳕鱼 + 干海带", hunger: "6 (3 点)", saturation: "1.6 (好)", recipe: "§l§6食谱:§r §7工作台§r\n[熟米饭][生鳕鱼][干海带]\n§7= 鳕鱼卷 x1§r" },
        "热带卷": { icon: "textures/items/tropical_roll", desc: "一款带有热带鱼的异国卷寿司.", obtain: "干海带 + 煮熟的米饭 + 热带鱼 (无特定摆放).", hunger: "4 (2 点)", saturation: "1.6 (好)", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[干海带] + [熟米饭] + [热带鱼]\n§7= 热带卷 x1§r" },
        "河豚寿司卷": { icon: "textures/items/pufferfish_roll", desc: "一种用河豚制作的大胆美食.食用需自担风险!", obtain: "干海带 + 米饭 + 河豚 (无特定摆放).", hunger: "4 (2 点)", saturation: "1.6 (好)", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[干海带] + [熟米饭] + [河豚]\n§7= 河豚寿司卷 x1§r" },
        "鱿鱼寿司": { icon: "textures/items/calamari_nigiri", desc: "鲷鱼寿司风格，顶部配嫩鱿鱼.", obtain: "生鱿鱼 + 熟米饭(无特定摆放).", hunger: "6 (3 点)", saturation: "1.2 (正常)", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[生鱿鱼] + [熟米饭]\n§7= 鱿鱼寿司 x1§r" },
        "三文鱼寿司": { icon: "textures/items/salmon_nigiri", desc: "经典寿司，米饭上放一片新鲜的三文鱼.", obtain: "生三文鱼 + 熟米饭 (无特定摆放).", hunger: "6 (3 点)", saturation: "1.2 (正常)", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[生三文鱼] + [熟米饭]\n§7= 三文鱼寿司 x1§r" },
        "胡萝卜寿司": { icon: "textures/items/carrot_nigiri", desc: "素食寿司配腌胡萝卜.", obtain: "胡萝卜 + 预制米饭 (无特定摆放).", hunger: "4 (2 点)", saturation: "1.6 (Good)", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[胡萝卜] + [熟米饭]\n§7= 胡萝卜寿司 x1§r" },
        "米饭海苔卷": { icon: "textures/items/rice_nori_maki", desc: "简单的海苔包饭卷.", obtain: "干海带 x3 + 米饭 x3.", hunger: "4 (2 点)", saturation: "2.0 (好+)", recipe: "§l§6食谱:§r §7工作台§r\n[干海带][干海带][干海带]\n[熟米饭][熟米饭][熟米饭]\n§7= 米饭海苔卷 x1§r" },
        "海带押寿司": { icon: "textures/items/kelp_oshizushi", desc: "海带夹层压寿司", obtain: "干海带，熟米，海带.", hunger: "4 (2 点)", saturation: "1.6 (Good)", recipe: "§l§6食谱:§r §7工作台§r\n[干海带][ ]\n[熟米饭][Kelp]\n§7= 海带押寿司 x1§r" },
        "海带卷": { icon: "textures/items/kelp_roll", desc: "用海带完全包裹的简单卷.", obtain: "干海带 x3.", hunger: "4 (2 点)", saturation: "1.6 (好)", recipe: "§l§6食谱:§r §7工作台§r\n[干海带][干海带][干海带]\n§7= 海带卷 x1§r" },
        "饭团": { icon: "textures/items/onigiri", desc: "用海苔包裹的手持饭团.", obtain: "熟米饭 x4 + 干海带.", hunger: "4 (2 点)", saturation: "1.2 (正常)", recipe: "§l§6食谱:§r §7工作台§r\n[ ][熟米饭][ ]\n[熟米饭][干海带][熟米饭]\n§7= 饭团 x1§r" },
        "手握寿司": { icon: "textures/items/temaki", desc: "一个手卷海苔筒，里面填充了米饭和配料.", obtain: "熟米饭 x2，干海带 x3，生三文鱼.", hunger: "6 (3 点)", saturation: "2.0 (好+)", recipe: "§l§6食谱:§r §7工作台§r\n[熟米饭][ ][熟米饭]\n[干海带][生三文鱼][干海带]\n[ ][干海带][ ]\n§7= Temaki x1§r" }
    }},

    "亚洲食品": { icon: "textures/items/fried_rice", items: {
        "炒饭": { icon: "textures/items/fried_rice", desc: "炒蔬菜调味饭.", obtain: "熟米饭、熟鸡肉、胡萝卜、钢碗.", hunger: "6 (3 点)", saturation: "1.6 (好)", other: "仅限堆叠至 1", recipe: "§l§6食谱:§r §7工作台§r\n[熟米饭][熟鸡肉]\n[胡萝卜][钢碗]\n§7= 炒饭 x1§r" },
        "日式蛋花汤": { icon: "textures/items/kakitamajiru", desc: "清淡的日式蛋花汤.", obtain: "干海带、鸡蛋（任何类型）、钢碗、水桶.", hunger: "6 (3 点)", saturation: "1.6 (好)", other: "仅限堆叠至 1", recipe: "§l§6食谱:§r §7工作台§r\n[干海带][ ]\n[鸡蛋][钢碗]\n[水桶][ ]\n§7= 日式蛋花汤 x1 + 桶 x1§r" },
        "米粥": { icon: "textures/items/kayu", desc: "温暖舒缓的米粥.", obtain: "熟米饭 x2，熟鳕鱼，钢碗.", hunger: "6 (3 点)", saturation: "1.6 (好)", other: "仅限堆叠至 1", recipe: "§l§6食谱:§r §7工作台§r\n[熟米饭][熟米饭]\n[煮鳕鱼][钢碗]\n§7= 米粥 x1§r" },
        "调味料": { icon: "textures/items/miso", desc: "经典的蔬菜味噌汤.", obtain: "干海带、海带、土豆、甜菜、装水桶、钢碗.", hunger: "5 (2.5 点)", saturation: "1.6 (好)", other: "仅限堆叠至 1", recipe: "§l§6食谱:§r §7工作台§r\n[干海带][海带][ ]\n[土豆][甜菜][水桶]\n[钢碗][ ][ ]\n§7= 调味料 x1 + 水桶 x1§r" },
        "猪肉味噌汤": { icon: "textures/items/tonjiru", desc: "丰盛的猪肉蔬菜味噌汤.", obtain: "熟猪排、胡萝卜、土豆、水桶、钢碗.", hunger: "7 (3.5 点)", saturation: "1.6 (好)", other: "仅限堆叠至 1", recipe: "§l§6食谱:§r §7工作台§r\n[熟猪排][胡萝卜][土豆]\n[水桶][钢碗][ ]\n§7= 猪肉味噌汤 x1 + 水桶 x1§r" },
        "拉面炖汤": { icon: "textures/items/ramen_stew", desc: "一碗浓郁美味的汤面.", obtain: "熟鸡肉，胡萝卜，拉面，钢碗，水桶.", hunger: "8 (4 点)", saturation: "1.6 (Good)", other: "Only stacks to 1", recipe: "§l§6食谱:§r §7工作台§r\n[熟鸡肉][ ][胡萝卜]\n[ ][拉面][ ]\n[钢碗][ ][水桶]\n§7= 拉面炖汤 x1 + 桶 x1§r" },
        "鲑鱼刺身": { icon: "textures/items/salmon_sashimi", desc: "薄片生三文鱼.一种美味.", obtain: "生三文鱼 x2 (无特定摆放).", hunger: "6 (3 点)", saturation: "1.2 (Normal)", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[生三文鱼] + [生三文鱼]\n§7= 鲑鱼刺身 x2§r" },
        "薰衣草和果子": { icon: "textures/items/lavender_wagashi", desc: "一种带有薰衣草味的精致日本甜点.", obtain: "糖，小麦，紫色染料，水桶.", hunger: "4 (2 点)", saturation: "1.6 (好)", recipe: "§l§6食谱:§r §7工作台§r\n[糖][ ]\n[小麦][紫色染料]\n[水桶][ ]\n§7= 薰衣草和果子 x1 + 水桶 x1§r" },
        "青柠日式点心": { icon: "textures/items/lime_wagashi", desc: "清爽的柑橘味日式和果子，颜色鲜亮的绿色.", obtain: "糖，小麦，石灰染料，水桶.", hunger: "4 (2 点)", saturation: "1.6 (好)", recipe: "§l§6食谱:§r §7工作台§r\n[糖][ ]\n[小麦][青色染料]\n[水桶][ ]\n§7= 青柠日式点心 x1 + 水桶 x1§r" },
        "粉色和菓子": { icon: "textures/items/pink_wagashi", desc: "一种带有花香味的甜粉色和菓子.", obtain: "糖，小麦，粉红染料，水桶.", hunger: "4 (2 点)", saturation: "1.6 (好)", recipe: "§l§6食谱:§r §7工作台§r\n[糖][ ]\n[小麦][粉红色染料]\n[水桶][ ]\n§7= 粉色和菓子 x1 + 桶 x1§r" },
        "夕阳和果子": { icon: "textures/items/yellow_red_wagashi", desc: "一种双色日式和菓子，带有温暖的夕阳色彩.", obtain: "糖，小麦，红色染料，水桶，黄色染料.", hunger: "4 (2 点)", saturation: "1.2 (正常)", other: "30% 堆肥", recipe: "§l§6食谱:§r §7工作台§r\n[糖][ ]\n[小麦][红色染料]\n[水桶][黄色染料]\n§7= 夕阳和果子 x1 + 水桶 x1§r" }
    }},

    "烘焙食品": { icon: "textures/items/sweet_berry_pie", subcategories: {
        "Pies": { icon: "textures/items/sweet_berry_pie", items: {
            "甜浆果派": { icon: "textures/items/sweet_berry_pie", desc: "一种酸甜的甜浆果馅派.可放置.", obtain: "甜浆果 + 糖 + 鸡蛋（任意类型）- 无定形.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "可放置\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[甜浆果] + [糖] + [鸡蛋]\n§7= 甜浆果派 x1§r" },
            "苹果派": { icon: "textures/items/apple_pie", desc: "一种金色的派，内馅是温暖的肉桂苹果.可放置.", obtain: "苹果 + 糖 + 鸡蛋（任意类型）- 无定形.", hunger: "8 (4 点)", saturation: "0.6 (低)", other: "可放置\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[苹果] + [糖] + [鸡蛋]\n§7= 苹果派 x1§r" },
            "发光浆果派": { icon: "textures/items/glow_berry_pie", desc: "一种用发光浆果制成的发光派.可放置.", obtain: "发光浆果 + 糖 + 鸡蛋（任意类型）- 无定形.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "可放置\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[发光浆果] + [糖] + [鸡蛋]\n§7= 发光浆果派 x1§r" },
            "墨莓派": { icon: "textures/items/inkberry_pie", desc: "一种深色的浓郁派，内馅呈深紫色.可放置.", obtain: "墨莓 + 糖 + 鸡蛋（任意类型）- 无定形.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "可放置\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[墨莓] + [糖] + [鸡蛋]\n§7= 墨莓派 x1§r" },
            "紫颂果派": { icon: "textures/items/chorus_fruit_pie", desc: "一种神秘的派.可放置.作为物品食用时会传送（方块形态不会）.", obtain: "紫颂果 + 糖 + 鸡蛋（任意类型）- 无定形.", hunger: "8 (4 点)", saturation: "0.6 (低)", other: "可放置\n物品食用时传送\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[紫颂果] + [糖] + [鸡蛋]\n§7= 紫颂果派 x1§r" },
            "南瓜派": { icon: "textures/items/pumpkin_pie", desc: "原版南瓜派的可放置版本.", obtain: "由 1 个原版南瓜派合成（无特定摆放）.", hunger: "8 (4 点)", saturation: "0.6 (低)", other: "可放置\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[原版南瓜派]\n§7= 可放置南瓜派 x1§r" },
            "甜菜根派": { icon: "textures/items/beetroot_pie", desc: "一种带有烤甜菜根的泥土风味派.可放置.", obtain: "甜菜根 + 糖 + 鸡蛋（任意类型）- 无定形.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "可放置\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[甜菜根] + [糖] + [鸡蛋]\n§7= 甜菜根派 x1§r" },
            "蜂巢派": { icon: "textures/items/honeycomb_pie", desc: "一种淋有蜂巢的粘稠甜味派.可放置.", obtain: "蜂巢 + 糖 + 鸡蛋（任意类型）- 无定形.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "可放置\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[蜂巢] + [糖] + [鸡蛋]\n§7= 蜂巢派 x1§r" },
            "巧克力派": { icon: "textures/items/chocolate_pie", desc: "一种奢华的巧克力奶油派.可放置.", obtain: "可可豆 + 糖 + 鸡蛋（任意类型）- 无定形.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "可放置\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[可可豆] + [糖] + [鸡蛋]\n§7= 巧克力派 x1§r" },
            "香料南瓜派": { icon: "textures/items/spiced_pumpkin_pie", desc: "添加了额外肉桂和姜的南瓜派.可放置.", obtain: "原版南瓜派 + 姜 + 肉桂（无特定摆放）.", hunger: "8 (4 点)", saturation: "0.6 (低)", other: "可放置\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[原版南瓜派] + [姜] + [肉桂]\n§7= 香料南瓜派 x1§r" },
            "白南瓜派": { icon: "textures/items/white_pumpkin_pie", desc: "一种用白南瓜制成的奶油派.可放置.", obtain: "白南瓜 + 糖 + 鸡蛋（任意类型）- 无定形.", hunger: "8 (4 点)", saturation: "0.6 (低)", other: "可放置\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[白南瓜] + [糖] + [鸡蛋]\n§7= 白南瓜派 x1§r" }
        }},
        "Cakes": { icon: "textures/items/cakes/sweet_berry_chocolate_cake", items: {
            "甜浆果巧克力蛋糕": { icon: "textures/items/cakes/sweet_berry_chocolate_cake", desc: "一种顶部装饰有甜浆果的巧克力蛋糕.必须放置后食用.", obtain: "奶桶 x3、糖 x2、鸡蛋（任意类型）、可可豆 x2、甜浆果.", hunger: null, saturation: null, other: "必须放置后食用\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[奶桶][奶桶][奶桶]\n[糖][鸡蛋][糖]\n[可可豆][甜浆果][可可豆]\n§7= 甜浆果巧克力蛋糕 x1 + 桶 x3§r" },
            "甜浆果蛋糕": { icon: "textures/items/cakes/sweet_berry_cake", desc: "一种蓬松的蛋糕，夹层有甜浆果奶油.必须放置后食用.", obtain: "奶桶 x3、糖 x2、鸡蛋（任意类型）、小麦 x2、甜浆果.", hunger: null, saturation: null, other: "必须放置后食用\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[奶桶][奶桶][奶桶]\n[糖][鸡蛋][糖]\n[小麦][甜浆果][小麦]\n§7= 甜浆果蛋糕 x1 + 桶 x3§r" },
            "彩虹蛋糕": { icon: "textures/items/cakes/rainbow_cake", desc: "一种色彩缤纷的多层庆典蛋糕.必须放置后食用.", obtain: "奶桶 x3、糖 x2、鸡蛋（任意类型）、蓝色染料、红色染料、黄色染料.", hunger: null, saturation: null, other: "必须放置后食用\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[奶桶][奶桶][奶桶]\n[糖][鸡蛋][糖]\n[蓝色染料][红色染料][黄色染料]\n§7= 彩虹蛋糕 x1 + 桶 x3§r" },
            "墨莓蛋糕": { icon: "textures/items/cakes/inkberry_cake", desc: "一种深色的优雅蛋糕，配有墨莓糖霜.必须放置后食用.", obtain: "奶桶 x3、糖 x2、鸡蛋（任意类型）、小麦 x2、墨莓.", hunger: null, saturation: null, other: "必须放置后食用\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[奶桶][奶桶][奶桶]\n[糖][鸡蛋][糖]\n[小麦][墨莓][小麦]\n§7= 墨莓蛋糕 x1 + 桶 x3§r" },
            "南瓜蛋糕": { icon: "textures/items/cakes/pumpkin_cake", desc: "一种湿润的蛋糕，含有香料南瓜层.必须放置后食用.", obtain: "奶桶 x3、糖 x2、鸡蛋（任意类型）、小麦 x2、南瓜.", hunger: null, saturation: null, other: "必须放置后食用\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[奶桶][奶桶][奶桶]\n[糖][鸡蛋][糖]\n[小麦][南瓜][小麦]\n§7= 南瓜蛋糕 x1 + 桶 x3§r" },
            "粉色蛋糕": { icon: "textures/items/cakes/pink_cake", desc: "一种漂亮的粉色蛋糕，配有花香糖霜.必须放置后食用.", obtain: "奶桶 x3、糖 x2、鸡蛋（任意类型）、小麦 x2、粉色染料.", hunger: null, saturation: null, other: "必须放置后食用\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[奶桶][奶桶][奶桶]\n[糖][鸡蛋][糖]\n[小麦][粉色染料][小麦]\n§7= 粉色蛋糕 x1 + 桶 x3§r" },
            "玉米蛋糕": { icon: "textures/items/cakes/corn_cake", desc: "一种密实的甜味玉米面包风格蛋糕.必须放置后食用.", obtain: "奶桶 x3、糖 x2、鸡蛋（任意类型）、小麦 x2、玉米.", hunger: null, saturation: null, other: "必须放置后食用\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[奶桶][奶桶][奶桶]\n[糖][鸡蛋][糖]\n[小麦][玉米][小麦]\n§7= 玉米蛋糕 x1 + 桶 x3§r" },
            "蓝莓蛋糕": { icon: "textures/items/cakes/blueberry_cake", desc: "一种柔软的蛋糕，充满蓝莓果香.必须放置后食用.", obtain: "奶桶 x3、糖 x2、鸡蛋（任意类型）、小麦 x2、蓝莓.", hunger: null, saturation: null, other: "必须放置后食用\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[奶桶][奶桶][奶桶]\n[糖][鸡蛋][糖]\n[小麦][蓝莓][小麦]\n§7= 蓝莓蛋糕 x1 + 桶 x3§r" },
            "柠檬蛋糕": { icon: "textures/items/cakes/lemon_cake", desc: "一种风味十足的柠檬蛋糕，配有酸味糖衣.必须放置后食用.", obtain: "奶桶 x3、糖 x2、鸡蛋（任意类型）、小麦 x2、黄色染料.", hunger: null, saturation: null, other: "必须放置后食用\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[奶桶][奶桶][奶桶]\n[糖][鸡蛋][糖]\n[小麦][黄色染料][小麦]\n§7= 柠檬蛋糕 x1 + 桶 x3§r" },
            "巧克力坚果蛋糕": { icon: "textures/items/cakes/chocolate_nut_cake", desc: "一种浓郁的巧克力蛋糕，配有脆坚果.必须放置后食用.可使用托夫尔坚果或橡果合成.", obtain: "奶桶 x3、糖 x2、鸡蛋（任意类型）、可可豆 x2、托夫尔坚果或橡果.", hunger: null, saturation: null, other: "必须放置后食用\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[奶桶][奶桶][奶桶]\n[糖][鸡蛋][糖]\n[可可豆][托夫尔坚果 / 橡果][可可豆]\n§7= 巧克力坚果蛋糕 x1 + 桶 x3§r" }
        }},
        "面包和糕点": { icon: "textures/items/croissant", items: {
            "一条面包": { icon: "textures/items/loaf_bread", desc: "一条新鲜的面包.可以切片.吃得慢两倍.", obtain: "小麦 x6.", hunger: "8 (4 点)", saturation: "1.6 (好)", other: "吃得慢两倍\n100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[小麦][小麦][小麦]\n[小麦][小麦][小麦]\n§7= 一条面包 x1§r" },
            "切片面包": { icon: "textures/items/sliced_bread", desc: "一片面包.用于制作吐司和三明治.", obtain: "一条面包 -> 切片面包 x4.", hunger: "2 (1 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[一条面包]\n§7= 切片面包 x4§r" },
            "南瓜面包": { icon: "textures/items/pumpkin_bread", desc: "湿润的香料面包，含有南瓜.", obtain: "小麦 x2 + 糖 + 南瓜 (无特定摆放).", hunger: "5 (2.5 点)", saturation: "1.6 (好)", other: "100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[小麦] + [小麦] + [糖] + [南瓜]\n§7= 南瓜面包 x1§r" },
            "羊角面包": { icon: "textures/items/croissant", desc: "一种黄油味、酥脆的法国糕点.", obtain: "糖 x2，小麦 x3，黄油.", hunger: "5 (2.5 点)", saturation: "1.6 (好)", other: "85% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[糖][ ][糖]\n[小麦][黄油][小麦]\n[ ][小麦][ ]\n§7= 羊角面包 x2§r" },
            "糖卷": { icon: "textures/items/sugar_roll", desc: "一种柔软的卷饼，外面裹着糖.", obtain: "糖 x3，黄油 x2，小麦.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[糖][糖][糖]\n[黄油][小麦][黄油]\n§7= 糖卷 x1§r" },
            "百吉饼": { icon: "textures/items/bagel", desc: "一种嚼劲十足的环形面包卷.", obtain: "小麦 x2，盐 x2，水桶.", hunger: "5 (2.5 点)", saturation: "1.6 (好)", recipe: "§l§6食谱:§r §7工作台§r\n[ ][小麦][ ]\n[盐][水桶][盐]\n[ ][小麦][ ]\n§7= 百吉饼 x1 + 水桶 x1§r" },
            "椒盐卷饼": { icon: "textures/items/pretzel", desc: "一种咸味、扭曲的面包小吃.", obtain: "盐，黄油 x2，小麦 x3.", hunger: "5 (2.5 点)", saturation: "1.6 (好)", other: "85% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[ ][盐][ ]\n[黄油][ ][黄油]\n[小麦][小麦][小麦]\n§7= 椒盐卷饼 x3§r" },
            "丘鲁": { icon: "textures/items/churro", desc: "一根油炸面团棒，外面裹着肉桂糖.像剑一样握着.", obtain: "肉桂 + 小麦 + 糖 (无特定摆放).", hunger: "3 (1.5 点)", saturation: "0.6 (低)", other: "像剑一样握着\n50% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[肉桂] + [小麦] + [糖]\n§7= 丘鲁 x1§r" }
        }},
        "松饼": { icon: "textures/items/sweet_berry_muffin", items: {
            "甜浆果松饼": { icon: "textures/items/sweet_berry_muffin", desc: "一个蓬松的松饼，里面满是甜浆果.", obtain: "甜浆果，小麦，鸡蛋（任意类型），糖.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[ ][甜浆果][ ]\n[小麦][鸡蛋][糖]\n§7= 甜浆果松饼 x1§r" },
            "巧克力松饼": { icon: "textures/items/chocolate_muffin", desc: "一个浓郁的巧克力松饼，里面有可可块.", obtain: "可可豆，小麦，鸡蛋（任意类型），糖.", hunger: "6 (3 点)", saturation: "1.6 (好)", other: "100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[ ][可可豆][ ]\n[小麦][鸡蛋][糖]\n§7= 巧克力松饼 x1§r" },
            "甜菜根松饼": { icon: "textures/items/beetroot_muffin", desc: "一个出人意料的甜松饼，含有甜菜根.", obtain: "甜菜根，小麦，鸡蛋（任意类型），糖.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[ ][甜菜根][ ]\n[小麦][鸡蛋][糖]\n§7= 甜菜根松饼 x1§r" },
            "墨莓松饼": { icon: "textures/items/inkberry_muffin", desc: "一个深色的松饼，里面有墨莓块.", obtain: "墨莓，小麦，鸡蛋（任意类型），糖.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[ ][墨莓][ ]\n[小麦][鸡蛋][糖]\n§7= 墨莓松饼 x1§r" },
            "罂粟籽松饼": { icon: "textures/items/poppyseed_muffin", desc: "一个经典的松饼，上面撒着罂粟籽.", obtain: "罂粟，小麦，鸡蛋（任意类型），糖.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "100% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[ ][罂粟][ ]\n[小麦][鸡蛋][糖]\n§7= 罂粟籽松饼 x1§r" }
        }},
        "甜甜圈": { icon: "textures/items/chocolate_donut", items: {
            "甜甜圈": { icon: "textures/items/donut", desc: "一个带金色糖霜的普通环形甜甜圈.", obtain: "糖 x5, 鸡蛋 (任何类型), 小麦 x3.", hunger: "4 (2 点)", saturation: "1.2 (正常)", other: "100% 可堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[糖][糖][糖]\n[糖][鸡蛋][糖]\n[小麦][小麦][小麦]\n§7= 甜甜圈 x1§r" },
            "甜莓甜甜圈": { icon: "textures/items/sweet_berry_donut", desc: "涂有甜浆果糖霜的甜甜圈.", obtain: "糖 x3, 甜莓 x2, 鸡蛋 (任何类型), 小麦 x3.", hunger: "6 (3 点)", saturation: "1.2 (正常)", other: "100% 可堆肥机率", recipe: "§l§6食谱:§r §7工作台§r\n[糖][糖][糖]\n[甜莓][鸡蛋][甜莓]\n[小麦][小麦][小麦]\n§7= 甜莓甜甜圈 x1§r" },
            "墨莓甜甜圈": { icon: "textures/items/inkberry_donut", desc: "一款覆盖深色浆果糖霜的甜甜圈.", obtain: "糖 x3, 墨莓 x2, 鸡蛋 (任何类型), 小麦 x3.", hunger: "6 (3 点)", saturation: "1.2 (正常)", other: "100% 可堆肥机率", recipe: "§l§6食谱:§r §7工作台§r\n[糖][糖][糖]\n[墨莓][鸡蛋][Inkberries]\n[小麦][小麦][小麦]\n§7= 墨莓甜甜圈 x1§r" },
            "巧克力甜甜圈": { icon: "textures/items/chocolate_donut", desc: "浸在浓郁巧克力里的甜甜圈.", obtain: "糖 x3, 可可豆 x2, 鸡蛋 (任何类型), 小麦 x3.", hunger: "6 (3 点)", saturation: "1.2 (正常)", other: "100% 可堆肥机率", recipe: "§l§6食谱:§r §7工作台§r\n[糖][糖][糖]\n[可可豆][鸡蛋][可可豆]\n[小麦][小麦][小麦]\n§7= 巧克力甜甜圈 x1§r" },
            "奶油甜甜圈": { icon: "textures/items/cream_donut", desc: "一个夹有甜奶油的甜甜圈.", obtain: "糖 x2, 牛奶瓶，可可豆 x2, 鸡蛋 (任何类型), 小麦 x3.", hunger: "6 (3 点)", saturation: "1.2 (正常)", other: "100% 可堆肥机率", recipe: "§l§6食谱:§r §7工作台§r\n[糖][奶瓶][糖]\n[可可豆][鸡蛋][可可豆]\n[小麦][小麦][小麦]\n§7= 奶油甜甜圈 x1 + 玻璃牛奶瓶 x1§r" }
        }},
        "饼干 & 布朗尼": { icon: "textures/items/chocolate_cookie", items: {
            "胡萝卜饼干": { icon: "textures/items/carrot_cookie", desc: "一款比较健康的饼干，含有碎胡萝卜.获取：小麦 x2 胡萝卜.", hunger: "6 (3 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[小麦][胡萝卜][小麦]\n§7= 胡萝卜饼干 x8§r" },
            "甜菜曲奇": { icon: "textures/items/beetroot_cookie", desc: "一块粉色的甜菜味饼干.", obtain: "小麦 x2 + 甜菜.", hunger: "4 (2 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[小麦][甜菜][小麦]\n§7= 甜菜曲奇 x8§r" },
            "巧克力曲奇": { icon: "textures/items/chocolate_cookie", desc: "经典巧克力碎片饼干.", obtain: "可可豆 x2 + 小麦.", hunger: "4 (2 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[可可豆][小麦][可可豆]\n§7= 巧克力曲奇 x8§r" },
            "姜饼": { icon: "textures/items/gingerbread_cookie", desc: "一种小人形状的香料饼干.", obtain: "姜 x2 + 小麦.", hunger: "2 (1 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[姜][小麦][姜]\n§7= 姜饼 x8§r" },
            "布朗尼": { icon: "textures/items/brownie", desc: "浓密、湿润的巧克力布朗尼.", obtain: "小麦 + 糖 + 可可豆 + 黄油 (无特定摆放).", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "100% 可堆肥机率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[小麦] + [糖] + [可可豆] + [黄油]\n§7= 布朗尼 x1§r" },
            "甜菜布朗尼": { icon: "textures/items/beetroot_brownie", desc: "加入隐形甜菜根保持湿润的布朗尼.", obtain: "小麦  糖 + 甜菜 + 可可豆 + 黄油 (无特定摆放).", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "100% 可堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[小麦] + [糖] + [甜菜] + [可可豆] + [黄油]\n§7= 甜菜布朗尼 x1§r" }
        }}
    }},

    "吐司、果冻和果汁": { icon: "textures/items/sweet_berry_toast", subcategories: {
        "吐司": { icon: "textures/items/sweet_berry_toast", items: {
            "甜莓吐司": { icon: "textures/items/sweet_berry_toast", desc: "涂有甜浆果酱的脆吐司.", obtain: "甜浆果面包 (无特定摆放).", hunger: "6 (3 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[甜莓] + [面包]\n§7= 甜莓吐司 x1§r" },
            "苹果吐司": { icon: "textures/items/apple_toast", desc: "吐司上铺有苹果片.", obtain: "苹果 + 面包 (无特定摆放).", hunger: "6 (3 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[苹果] + [面包]\n§7= 苹果吐司 x1§r" },
            "发光莓果吐司": { icon: "textures/items/glow_berry_toast", desc: "涂有微微闪光的光果酱的吐司.", obtain: "发光浆果 + 面包 (无特定摆放).", hunger: "6 (3 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[发光浆果] + [面包]\n§7= 发光莓果吐司 x1§r" },
            "鬼莓吐司": { icon: "textures/items/ghostberry_toast", desc: "用鬼莓制作的苍白、诡异的烤酒.", obtain: "幽灵浆果 +  面包 (无特定摆放).", hunger: "6 (3 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[幽灵莓] + [面包]\n§7= 鬼莓吐司 x1§r" },
            "墨莓吐司": { icon: "textures/items/inkberry_toast", desc: "深紫色吐司配墨果酱.", obtain: "墨莓 + 面包 (无特定摆放).", hunger: "6 (3 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[墨莓] + [面包]\n§7= 墨莓吐司 x1§r" },
            "醋栗吐司": { icon: "textures/items/gooseberry_toast", desc: "涂有酸醋醋果酱的吐司.", obtain: "醋栗 + 面包 (无特定摆放).", hunger: "6 (3 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[醋栗] + [面包]\n§7= 醋栗吐司 x1§r" },
            "樱桃吐司": { icon: "textures/items/cherry_toast", desc: "吐司上铺有新鲜樱桃.", obtain: "樱桃 + 面包 (无特定摆放).", hunger: "6 (3 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[樱桃] + [面包]\n§7= 樱桃吐司 x1§r" },
            "李子吐司": { icon: "textures/items/plum_toast", desc: "涂甜梅子果酱的吐司.", obtain: "李子 + 面包 (无特定摆放).", hunger: "6 (3 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[李子] + [面包]\n§7= 李子吐司 x1§r" },
            "紫颂果吐司": { icon: "textures/items/chorus_fruit_toast", desc: "用紫颂果做的吐司，食用时会传送.", obtain: "紫颂果 + 面包 (无特定摆放).", hunger: "6 (3 点)", saturation: "1.2 (正常)", other: "消耗物品时传送\n30% 堆肥几率", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[紫颂果] + [面包]\n§7= 紫颂果吐司 x1§r" }
        }},
        "果冻": { icon: "textures/items/sweet_berry_jelly", items: {
            "甜莓果冻": { icon: "textures/items/sweet_berry_jelly", desc: "用甜浆果制作的晃动果冻.", obtain: "甜莓 x2 + 糖 x2 + 空罐.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "堆叠到 16", recipe: "§l§6食谱:§r §7工作台§r\n[ ][甜莓][ ]\n[糖][空罐][糖]\n[ ][甜莓][ ]\n§7= 甜莓果冻 x1§r" },
            "苹果果冻": { icon: "textures/items/apple_jelly", desc: "清爽的果冻，带有新鲜的苹果味.", obtain: "苹果 x2 + 糖 x2  空罐. 也适用于青苹果.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "可叠加至16", recipe: "§l§6食谱:§r §7工作台§r\n[ ][苹果][ ]\n[糖][空罐][糖]\n[ ][苹果][ ]\n§7= 苹果果冻 x1§r\n§7也适用于青苹果§r" },
            "发光浆果果冻": { icon: "textures/items/glow_berry_jelly", desc: "一种微微发光的发光水母.", obtain: "发光浆果 x2 + 糖 x2 + 空罐.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "叠加至16", recipe: "§l§6食谱:§r §7工作台§r\n[ ][发光浆果][ ]\n[糖][空罐][糖]\n[ ][发光浆果][ ]\n§7= 发光莓果果冻 x1§r" },
            "鬼莓果冻": { icon: "textures/items/ghostberry_jelly", desc: "半透明的、幽灵般的果冻.", obtain: "幽灵莓 x2 + 糖 x2 + 空罐.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "可叠加至16", recipe: "§l§6食谱:§r §7工作台§r\n[ ][幽灵莓][ ]\n[糖][空罐][糖]\n[ ][幽灵莓][ ]\n§7= 鬼莓果冻 x1§r" },
            "墨莓果冻": { icon: "textures/items/inkberry_jelly", desc: "深紫色果冻，味道浓郁.", obtain: "墨莓 x2 + 糖 x2 + 空罐.", hunger: "6 (3 点)", saturation: "0.6 (Low)", other: "Stacks to 16", recipe: "§l§6食谱:§r §7工作台§r\n[ ][墨莓][ ]\n[糖][空罐][糖]\n[ ][墨莓][ ]\n§7= 墨莓果冻 x1§r" },
            "醋栗果冻": { icon: "textures/items/gooseberry_jelly", desc: "带刺果的酸绿果冻.", obtain: "醋栗 x2 + 糖 x2 + 空罐.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "可叠加至16", recipe: "§l§6食谱:§r §7工作台§r\n[ ][醋栗][ ]\n[糖][空罐][糖]\n[ ][醋栗][ ]\n§7= 醋栗果冻 x1§r" },
            "樱桃果冻": { icon: "textures/items/cherry_jelly", desc: "一种樱桃味的鲜红色果冻.", obtain: "樱桃 x2 + 糖 x2 + 空罐.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "可叠加至16", recipe: "§l§6食谱:§r §7工作台§r\n[ ][樱桃][ ]\n[糖][空罐][糖]\n[ ][樱桃][ ]\n§7= 樱桃果冻 x1§r" },
            "梅子果冻": { icon: "textures/items/plum_jelly", desc: "用李子制成的浓紫色果冻.", obtain: "李子 x2 + 糖 x2 + 空罐.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "可叠加至16", recipe: "§l§6食谱:§r §7工作台§r\n[ ][李子][ ]\n[糖][空罐][糖]\n[ ][李子][ ]\n§7= 梅子果冻 x1§r" },
            "紫颂果果冻": { icon: "textures/items/chorus_fruit_jelly", desc: "一种闪烁着末影能量的奇异果冻. 消耗物品时传送.", obtain: "紫松果 x2 + 糖 x2 + 空罐.", hunger: "6 (3 点)", saturation: "0.6 (低)", other: "使用物品时瞬移最多叠加16层", recipe: "§l§6食谱:§r §7工作台§r\n[ ][紫松果][ ]\n[糖][Empty Jar][糖]\n[ ][紫松果][ ]\n§7= 紫松果果冻 x1§r" }
        }},
        "果汁": { icon: "textures/items/sweet_berry_juice", items: {
            "甜莓果汁": { icon: "textures/items/sweet_berry_juice", desc: "由甜浆果制成的清爽果汁.", obtain: "水瓶 + 甜莓 +糖(无特定摆放).", hunger: "4 (2 点)", saturation: "0.2 (贫穷)", other: "可叠加至16", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[水瓶] + [甜莓] + [糖]\n§7= 甜莓果汁 x1§r" },
            "苹果汁": { icon: "textures/items/apple_juice", desc: "清脆爽口的苹果汁.", obtain: "水瓶 + 苹果 + 糖 (无特定摆放). 也适用于青苹果.", hunger: "4 (2 点)", saturation: "0.2 (贫穷)", other: "叠到16", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[水瓶] + [苹果] + [糖]\n§7= 苹果汁 x1§r\n§7也适用于青苹果§r" },
            "发光莓果汁": { icon: "textures/items/glow_berry_juice", desc: "一种散发着温暖光芒的果汁+.", obtain: "水瓶 + 发光浆果 + 糖(无特定摆放).", hunger: "4 (2 点)", saturation: "0.2 (贫穷)", other: "可叠加至16", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[水瓶] + [发光浆果] + [糖]\n§7= 发光莓果汁 x1§r" },
            "鬼莓汁": { icon: "textures/items/ghostberry_juice", desc: "一种带有幽灵莓的苍白、空灵果汁.", obtain: "水瓶+幽灵莓+糖 (无特定摆放).", hunger: "4 (2 点)", saturation: "0.2 (贫穷)", other: "可叠加至16", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[水瓶] + [幽灵莓] + [糖]\n§7= 鬼莓汁 x1§r" },
            "墨莓汁": { icon: "textures/items/inkberry_juice", desc: "一种能弄脏所接触物品的深色果汁.", obtain: "水瓶 + 黑莓 + 糖 (无特定摆放).", hunger: "4 (2 点)", saturation: "0.2 (贫穷)", other: "可叠加至16", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[水瓶] + [墨莓] + [糖]\n§7= 墨莓汁 x1§r" },
            "醋栗汁": { icon: "textures/items/gooseberry_juice", desc: "酸涩的醋栗汁。", obtain: "水瓶 + 醋栗 + 糖 (无特定摆放).", hunger: "4 (2 点)", saturation: "0.2 (Poor)", other: "堆叠到16", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[水瓶] + [醋栗] + [糖]\n§7= 醋栗汁 x1§r" },
            "樱桃汁": { icon: "textures/items/cherry_juice", desc: "玻璃瓶中的甜樱桃汁。", obtain: "水瓶 + 樱桃 + 糖 (无特定摆放).", hunger: "4 (2 点)", saturation: "0.2 (Poor)", other: "堆叠到16", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[水瓶] + [樱桃] + [糖]\n§7= 樱桃汁 x1§r" },
            "李子汁": { icon: "textures/items/plum_juice", desc: "由成熟李子制成的顺滑果汁.", obtain: "水瓶 + 李子 + 糖(无特定摆放).", hunger: "4 (2 点)", saturation: "0.2 (Poor)", other: "叠加至16", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[水瓶] + [李子] + [糖]\n§7= 李子汁 x1§r" },
            "紫松果汁": { icon: "textures/items/chorus_fruit_juice", desc: "一款含紫松果的气泡果汁. 消耗物品时传送.", obtain: "水瓶 + 紫松果 + 糖 (无特定摆放).", hunger: "4 (2 点)", saturation: "0.2 (贫穷)", other: "消耗物品时传送\n可叠加至16", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[Water Bottle] + [紫松果] + [糖]\n§7= 紫松果汁 x1§r" }
        }}
    }},

    "肉类": { icon: "textures/items/cooked_turkey", items: {
        "土耳其": { icon: "textures/items/cooked_turkey", desc: "农场鸟类，会掉落各种肉块。", obtain: "由火鸡生物死亡时掉落。", hunger: null, saturation: null, related: [
            { name: "生火鸡", icon: "textures/items/raw_turkey", desc: "未煮熟的火鸡肉。可以放置。给予饥饿效果。", obtain: "由火鸡生物死亡时掉落。", hunger: "2 (1 shank)", saturation: "1.6 (Good)", other: "可以放置\n给予饥饿效果" },
            { name: "熟火鸡", icon: "textures/items/cooked_turkey", desc: "多汁的熟火鸡。可以放置。", obtain: "熔炼生火鸡肉。", hunger: "8 (4 点)", saturation: "1.6 (Good)", other: "可以放置", recipe: "§l§6Smelting:§r §7 熔炉/烟熏炉/营火/灵魂营火§r\n生火鸡 -> 熟火鸡" },
            { name: "生火鸡腿", icon: "textures/items/raw_turkey_leg", desc: "生火鸡腿。像剑一样握持。给予饥饿效果。", obtain: "从生火鸡肉合成 (无特定摆放)。", hunger: "1 (0.5 点)", saturation: "0.6 (Low)", other: "像剑一样握持\n给予饥饿效果", recipe: "§l§6食谱:§r §7工作台 (无特定摆放)§r\n[生火鸡]\n§7= 生火鸡腿 x2§r" },
            { name: "熟火鸡腿", icon: "textures/items/cooked_turkey_leg", desc: "完美烤制的火鸡腿。像剑一样握持。", obtain: "熔炼生火鸡腿。也从熟火鸡合成 (无特定摆放)。", hunger: "2 (1 点)", saturation: "1.6 (好)", other: "像剑一样握持", recipe: "§l§6S融炼:§r §7 熔炉/烟熏炉/营火/灵魂营火§r\n生火鸡腿 -> 熟火鸡腿\n\n§l§6食谱:§r §7工作台 (无特定摆放)§r\n[熟火鸡]\n§7= 熟火鸡腿 x2§r" },
            { name: "火鸡羽毛", icon: "textures/items/turkey_feather", desc: "火鸡的羽毛。在大多数配方中可以用作羽毛。", obtain: "由火鸡生物死亡时掉落。", hunger: null, saturation: null },
            { name: "火鸡蛋", icon: "textures/items/turkey_egg", desc: "火鸡下的蛋。可以投掷或在配方中用作蛋。", obtain: "由火鸡生物定期掉落。", hunger: null, saturation: null }
        ]},
        "骆驼": { icon: "textures/items/cooked_camel_meat", desc: "从骆驼获得的肉。", obtain: "由骆驼死亡时掉落。", hunger: null, saturation: null, related: [
            { name: "生骆驼肉", icon: "textures/items/raw_camel_meat", desc: "骆驼的生肉。", obtain: "由骆驼死亡时掉落。", hunger: "3 (1.5 点)", saturation: "0.6 (低)" },
            { name: "熟骆驼肉", icon: "textures/items/cooked_camel_meat", desc: "嫩熟的骆驼肉。", obtain: "熔炼生骆驼肉。", hunger: "8 (4 点)", saturation: "1.6 (良好)", recipe: "§l§6 熔炼:§r §7 熔炉/烟熏炉/营火/灵魂营火§r\n生骆驼肉 -> 熟骆驼肉" }
        ]},
        "炽足兽": { icon: "textures/items/cooked_strider_meat", desc: "从下界中的炽足兽获得的肉。", obtain: "由炽足兽死亡时掉落。", hunger: null, saturation: null, related: [
            { name: "生炽足兽肉", icon: "textures/items/raw_strider_meat", desc: "炽足兽的生肉。闻起来像熔岩。", obtain: "由炽足兽死亡时掉落。", hunger: "2 (1 点)", saturation: "0.6 (低)" },
            { name: "熟炽足兽肉", icon: "textures/items/cooked_strider_meat", desc: "熟炽足兽肉。尝起来烟熏味。", obtain: "熔炼生炽足兽肉。", hunger: "6 (3 点)", saturation: "1.6 (良好)", recipe: "§l§6 熔炼:§r §7 熔炉/烟熏炉/营火/灵魂营火§r\n生炽足兽肉 -> 熟炽足兽肉" }
        ]},
        "鱿鱼": { icon: "textures/items/cooked_squid", desc: "从鱿鱼获得的肉。可以切成鱿鱼圈。", obtain: "由鱿鱼死亡时掉落。", hunger: null, saturation: null, related: [
            { name: "生鱿鱼", icon: "textures/items/raw_squid", desc: "整条生鱿鱼。", obtain: "由鱿鱼死亡时掉落。", hunger: "3 (1.5 点)", saturation: "1.2 (普通)" },
                        { name: "熟鱿鱼", icon: "textures/items/cooked_squid", desc: "整条熟鱿鱼。吃起来需要 2 倍时间。", obtain: "熔炼生鱿鱼。", hunger: "8 (4 点)", saturation: "2.4 (极佳)", other: "吃起来需要 2 倍时间", recipe: "§l§6 熔炼:§r §7 熔炉/烟熏炉/营火/灵魂营火§r\n生鱿鱼 -> 熟鱿鱼" },
            { name: "生鱿鱼圈", icon: "textures/items/raw_calamari", desc: "生鱿鱼圈，准备烹饪。", obtain: "从生鱿鱼合成 (无特定摆放)。", hunger: "1 (0.5 点)", saturation: "0.6 (低)", recipe: "§l§6 食谱:§r §7 工作台 (无特定摆放)§r\n[生鱿鱼]\n§7= 生鱿鱼圈 x3§r" },
            { name: "熟鱿鱼圈", icon: "textures/items/cooked_calamari", desc: "金黄炸鱿鱼圈。", obtain: "熔炼生鱿鱼圈。也从熟鱿鱼合成 (无特定摆放)。", hunger: "3 (1.5 点)", saturation: "1.6 (良好)", recipe: "§l§6 熔炼:§r §7 熔炉/烟熏炉/营火/灵魂营火§r\n生鱿鱼圈 -> 熟鱿鱼圈\n\n§l§6 食谱:§r §7 工作台 (无特定摆放)§r\n[熟鱿鱼]\n§7= 熟鱿鱼圈 x3§r" }
        ]}
    }},

"其他食物": { icon: "textures/items/beef_sandwich", items: {
        "牛肉三明治": { icon: "textures/items/beef_sandwich", desc: "塞满熟牛肉和生菜的丰盛三明治。", obtain: "面包 + 熟牛肉 + 生菜 (无特定摆放)。", hunger: "12 (6 点)", saturation: "1.6 (良好)", recipe: "§l§6 食谱:§r §7 工作台 (无特定摆放)§r\n[面包] + [熟牛肉] + [生菜]\n§7= 牛肉三明治 x1§r" },
        "沙拉": { icon: "textures/items/salad", desc: "混合蔬菜的新鲜沙拉。", obtain: "土豆 + 胡萝卜 + 甜菜根 + 碗 (无特定摆放)。", hunger: "6 (3 点)", saturation: "1.2 (普通)", recipe: "§l§6 食谱:§r §7 工作台 (无特定摆放)§r\n[马铃薯] + [胡萝卜] + [甜菜根] + [碗]\n§7= 沙拉 x1§r" },
                "甜莓酸奶": { icon: "textures/items/sweet_berry_yogurt", desc: "混合甜莓的奶油酸奶。食用速度加倍。", obtain: "甜莓、牛奶桶、碗。", hunger: "4 (2 点)", saturation: "2.4 (极佳)", other: "食用速度加倍\n仅可堆叠至 1 个", recipe: "§l§6 食谱:§r §7 工作台§r\n[甜莓]\n[牛奶桶]\n[碗]\n§7= 甜莓酸奶 x1 + 空桶 x1§r" },
        "托夫坚果汤": { icon: "textures/items/tofflenut_broth", desc: "一种用托夫坚果浆果制成的温暖肉汤。", obtain: "托夫坚果浆果 x3 + 碗 (无特定摆放)。", hunger: "6 (3 点)", saturation: "2.4 (极佳)", other: "仅可堆叠至 1 个", recipe: "§l§6 食谱:§r §7 工作台 (无特定摆放)§r\n[托夫坚果浆果] + [托夫坚果浆果] + [托夫坚果浆果] + [碗]\n§7= 托夫坚果汤 x1§r" },
        "托夫坚果汁液": { icon: "textures/items/tofflenut_sap", desc: "从托夫坚果灌木收集的粘稠汁液。", obtain: "用空玻璃瓶右键点击托夫坚果灌木。", hunger: "2 (1 点)", saturation: "0.2 (低)", other: "给予饥饿效果\n可堆叠至 16 个" },
        "托夫坚果糖浆": { icon: "textures/items/tofflenut_syrup", desc: "从托夫坚果汁液提炼的甜味糖浆。", obtain: "熔炼托夫坚果汁液。", hunger: "6 (3 点)", saturation: "2.4 (极佳)", other: "可堆叠至 16 个", recipe: "§l§6 熔炼:§r §7 熔炉/烟熏炉/营火/灵魂营火§r\n托夫坚果汁液 -> 托夫坚果糖浆" },
        "烧焦的肉": { icon: "textures/items/burnt_meat", desc: "过度烹饪的肉。不太开胃。", obtain: "熔炼熟牛肉或熟猪排。", hunger: "2 (1 点)", saturation: "0.2 (低)", recipe: "§l§6 熔炼:§r §7 熔炉/烟熏炉/营火/灵魂营火§r\n熟牛肉 -> 烧焦的肉\n熟猪排 -> 烧焦的肉" },
        "烧焦的禽肉": { icon: "textures/items/burnt_meat2", desc: "过度烹饪的禽肉。不太开胃。", obtain: "熔炼熟鸡肉、熟兔肉、熟火鸡肉或熟火鸡腿。", hunger: "2 (1 点)", saturation: "0.2 (低)", recipe: "§l§6 熔炼:§r §7 熔炉/烟熏炉/营火/灵魂营火§r\n熟鸡肉 -> 烧焦的禽肉\n熟兔肉 -> 烧焦的禽肉\n熟火鸡肉 -> 烧焦的禽肉\n熟火鸡腿 -> 烧焦的禽肉" },
        "洋葱片": { icon: "textures/items/onion_slice", desc: "用于烹饪的薄洋葱片。", obtain: "葱或红葱 (无特定摆放)。", hunger: "1 (0.5 点)", saturation: "1.2 (普通)", other: "30% 堆肥几率", recipe: "§l§6 食谱:§r §7 工作台 (无特定摆放)§r\n[葱] 或 [红葱]\n§7= 洋葱片 x3§r" },
        "洋葱圈": { icon: "textures/items/onion_rings", desc: "酥脆的炸洋葱圈。", obtain: "熔炼洋葱片。", hunger: "4 (2 点)", saturation: "1.2 (普通)", other: "30% 堆肥几率", recipe: "§l§6 熔炼:§r §7 熔炉/烟熏炉/营火/灵魂营火§r\n洋葱片 -> 洋葱圈" },
        "洋葱炖菜": { icon: "textures/items/onion_stew", desc: "一道美味的炖菜，配有焦糖洋葱和奶酪。", obtain: "大蒜、奶酪、盐、洋葱片 x2、水桶、钢碗。", hunger: "10 (5 点)", saturation: "1.6 (良好)", other: "仅可堆叠至 1 个", recipe: "§l§6 食谱:§r §7 工作台§r\n[大蒜][奶酪][盐]\n[洋葱片][水桶][洋葱片]\n[ ][钢碗][ ]\n§7= 洋葱炖菜 x1 + 空桶 x1§r" },
        "史莱姆汤": { icon: "textures/items/slime_soup", desc: "一种凝胶状的汤。口感 Q 弹。", obtain: "史莱姆球 x3、钢碗。", hunger: "8 (4 点)", saturation: "1.6 (良好)", other: "仅可堆叠至 1 个", recipe: "§l§6 食谱:§r §7 工作台§r\n[史莱姆球][史莱姆球][史莱姆球]\n[ ][钢碗][ ]\n§7= 史莱姆汤 x1§r" },
        "根茎炖菜": { icon: "textures/items/roots_stew", desc: "用根菜制作的浓稠炖菜。", obtain: "小红萝卜、甜菜根、欧防风、萝卜、钢碗。", hunger: "8 (4 点)", saturation: "1.6 (良好)", other: "仅可堆叠至 1 个", recipe: "§l§6 食谱:§r §7 工作台§r\n[ ][小红萝卜][ ]\n[甜菜根][钢碗][欧防风]\n[ ][萝卜][ ]\n§7= 根茎炖菜 x1§r" },
        "炒菜": { icon: "textures/items/stir_fry", desc: "用锅炒的蔬菜和米饭.", obtain: "胡萝卜 + 熟米饭 + 西兰花 + 洋葱（任意类型）+ 钢碗 + 盐（无定形）.", hunger: "8 (4 点)", saturation: "1.6 (好)", other: "仅堆叠到1", recipe: "§l§6食谱:§r §7工作台 (无定形)§r\n[胡萝卜] + [熟米饭] + [西兰花] + [洋葱] + [钢碗] + [盐]\n§7= 炒菜 x1§r" },
        "咖喱": { icon: "textures/items/curry", desc: "加入蔬菜和米饭的香料咖喱.", obtain: "生姜、熟米饭、芜菁种子、番茄、钢碗、红辣椒.", hunger: "8 (4 点)", saturation: "1.6 (好)", other: "仅堆叠到1", recipe: "§l§6食谱:§r §7工作台§r\n[生姜][熟米饭][芜菁种子]\n[番茄][钢碗][红辣椒]\n§7= 咖喱 x1§r" },
        "奶油火鸡炖菜": { icon: "textures/items/creamy_turkey_stew", desc: "用火鸡腿、牛奶和洋葱制作的丰富奶油炖菜.", obtain: "熟的火鸡腿 x2、牛奶瓶 x2、洋葱片 x2、钢碗（有定形）.", hunger: "8 (4 点)", saturation: "1.6 (好)", other: "仅堆叠到1", recipe: "§l§6食谱:§r §7工作台§r\n[牛奶瓶][熟的火鸡腿][牛奶瓶]\n[洋葱片][钢碗][洋葱片]\n§7= 奶油火鸡炖菜 x1 + 玻璃牛奶瓶 x2§r" },
        "鸡汤面": { icon: "textures/items/chicken_noodle_soup", desc: "一碗舒服的汤，里面有鸡肉、面条、胡萝卜、大蒜和洋葱.", obtain: "拉面 + 熟的鸡肉 + 胡萝卜 + 大蒜 + 钢碗 + 洋葱片（无定形）.", hunger: "8 (4 点)", saturation: "1.6 (好)", other: "仅堆叠到1", recipe: "§l§6食谱:§r §7工作台 (无定形)§r\n[拉面] + [熟的鸡肉] + [胡萝卜] + [大蒜] + [钢碗] + [洋葱片]\n§7= 鸡汤面 x1§r" },
        "火鸡炖菜": { icon: "textures/items/turkey_stew", desc: "一道丰厚的炖菜，含有火鸡腿、辣椒、青椒和洋葱.", obtain: "熟的火鸡腿 + 红辣椒 + 青椒 + 洋葱片 x2 + 钢碗（无定形）.", hunger: "8 (4 点)", saturation: "1.6 (好)", other: "仅堆叠到1", recipe: "§l§6食谱:§r §7工作台 (无定形)§r\n[熟的火鸡腿] + [红辣椒] + [青椒] + [洋葱片] + [洋葱片] + [钢碗]\n§7= 火鸡炖菜 x1§r" },
        "照烧火鸡腿": { icon: "textures/items/teriyaki_turkey_leg", desc: "一条镶有甜蜜太妃坚果糖浆和盐的光泽火鸡腿.像剑一样握着.", obtain: "太妃坚果糖浆 + 熟的火鸡腿 + 盐（有定形）.", hunger: "4 (2 点)", saturation: "1.6 (好)", other: "像剑一样握着", recipe: "§l§6食谱:§r §7工作台§r\n[太妃坚果糖浆][熟的火鸡腿]\n[盐][ ]\n§7= 照烧火鸡腿 x1 + 玻璃瓶 x1§r" },
        "奶酪": { icon: "textures/items/cheese", desc: "一块老化的奶酪.", obtain: "盐、牛奶桶、橙色染料.", hunger: "8 (4 点)", saturation: "2.4 (超自然)", recipe: "§l§6食谱:§r §7工作台§r\n[盐][牛奶桶]\n[ ][橙色染料]\n§7= 奶酪 x1 + 桶 x1§r" },
        "煎蛋": { icon: "textures/items/fried_egg", desc: "一个简单的荷包蛋.", obtain: "冶炼任何蛋.", hunger: "4 (2 点)", saturation: "1.6 (好)", recipe: "§l§6冶炼:§r §7熔炉/烟熏炉/篝火/灵魂篝火§r\n蛋（任意类型）-> 煎蛋" },
        "牛奶瓶": { icon: "textures/items/milk_bottle", desc: "一瓶新鲜牛奶.清除状态效果.", obtain: "玻璃牛奶瓶 x3 + 牛奶桶，或直接在牛上使用玻璃牛奶瓶.", hunger: "4 (2 点)", saturation: "0.6 (很低)", other: "清除所有状态效果\n堆叠到16", recipe: "§l§6食谱:§r §7工作台§r\n[ ][牛奶桶][ ]\n[玻璃牛奶瓶][玻璃牛奶瓶][玻璃牛奶瓶]\n§7= 牛奶瓶 x3 + 桶 x1§r" },
        "巧克力牛奶瓶": { icon: "textures/items/chocolate_milk_bottle", desc: "甜的巧克力牛奶.清除状态效果.", obtain: "可可豆 x2 + 糖 + 牛奶瓶.", hunger: "6 (3 点)", saturation: "0.6 (很低)", other: "清除所有状态效果\n堆叠到16", recipe: "§l§6食谱:§r §7工作台§r\n[可可豆][糖][可可豆]\n[ ][牛奶瓶][ ]\n§7= 巧克力牛奶瓶 x1§r" },
        "浆果牛奶瓶": { icon: "textures/items/berry_milk_bottle", desc: "用甜浆果混合的牛奶.清除状态效果.", obtain: "甜浆果 x2 + 糖 + 牛奶瓶.", hunger: "6 (3 点)", saturation: "0.6 (很低)", other: "清除所有状态效果\n堆叠到16", recipe: "§l§6食谱:§r §7工作台§r\n[甜浆果][糖][甜浆果]\n[ ][牛奶瓶][ ]\n§7= 浆果牛奶瓶 x1§r" },
        "蛋酒": { icon: "textures/items/eggnog", desc: "一种含有蛋和香料的奶油假日饮料.清除状态效果.", obtain: "蛋（任意类型）+ 牛奶瓶 + 生姜（无定形）.", hunger: "6 (3 点)", saturation: "0.6 (很低)", other: "清除所有状态效果\n堆叠到16", recipe: "§l§6食谱:§r §7工作台 (无定形)§r\n[蛋] + [牛奶瓶] + [生姜]\n§7= 蛋酒 x1§r" },
        "拐杖糖": { icon: "textures/items/candy_cane", desc: "一根节日薄荷糖拐杖.", obtain: "糖 + 红色染料 + 白色染料（无定形）.", hunger: "4 (2 点)", saturation: "0.6 (很低)", recipe: "§l§6食谱:§r §7工作台 (无定形)§r\n[糖] + [红色染料] + [白色染料]\n§7= 拐杖糖 x1§r" },
        "向日葵籽": { icon: "textures/items/sunflower_seeds", desc: "酥脆的烤向日葵籽.吃得快2倍.不可种植.", obtain: "破坏向日葵时的稀有掉落物.", hunger: "2 (1 点)", saturation: "1.2 (正常)", other: "吃得快2倍\n不可种植" }
    }},

    "浆果": { icon: "textures/items/inkberries", items: {
        "墨浆果": { icon: "textures/items/inkberries", desc: "像墨水一样染色的深紫色浆果.吃得快2倍.", obtain: "从沼泽和红树林沼泽生物群系中的墨浆果灌木收获.也可以从甜浆果 + 墨囊制作.", hunger: "3 (1.5 点)", saturation: "0.2 (很低)", other: "可制作成蓝色染料\n30% 堆肥几率", recipe: "§l§6食谱:§r §7工作台§r\n[甜浆果][甜浆果][甜浆果]\n[甜浆果][墨囊][甜浆果]\n[甜浆果][甜浆果][甜浆果]\n§7= 墨浆果 x8§r", related: [
            { name: "墨浆果灌木", icon: "textures/blocks/berries/inkberries_bush/inkberries_bush_stage_3", desc: "一种完全生长时会产生墨浆果的灌木.", obtain: "生成在沼泽和红树林沼泽生物群系.", hunger: null, saturation: null }
        ]},
        "红树莓": { icon: "textures/items/raspberries", desc: "明亮的红树莓.吃得快2倍.", obtain: "从森林生物群系中的树莓灌木收获.", hunger: "3 (1.5 点)", saturation: "0.2 (很低)", other: "30% 堆肥几率", related: [{ name: "树莓灌木", icon: "textures/blocks/berries/raspberries_bush/raspberries_bush_stage_3", desc: "一种完全生长时会产生树莓的灌木.", obtain: "生成在森林生物群系.", hunger: null, saturation: null }] },
        "黑莓": { icon: "textures/items/blackberries", desc: "深色、成熟的黑莓.吃得快2倍.", obtain: "从桦木林生物群系中的黑莓灌木收获.", hunger: "3 (1.5 点)", saturation: "0.2 (很低)", other: "30% 堆肥几率", related: [{ name: "黑莓灌木", icon: "textures/blocks/berries/blackberries_bush/blackberries_bush_stage_3", desc: "一种完全生长时会产生黑莓的灌木.", obtain: "生成在桦木林生物群系.", hunger: null, saturation: null }] },
        "蓝莓": { icon: "textures/items/blueberries", desc: "小的、甜的蓝莓.吃得快2倍.", obtain: "从平原生物群系中的蓝莓灌木收获.", hunger: "3 (1.5 点)", saturation: "0.2 (很低)", other: "30% 堆肥几率", related: [{ name: "蓝莓灌木", icon: "textures/blocks/berries/blueberries_bush/blueberries_bush_stage_3", desc: "一种完全生长时会产生蓝莓的灌木.", obtain: "生成在平原生物群系.", hunger: null, saturation: null }] },
        "鹅莓": { icon: "textures/items/gooseberries", desc: "酸的绿色浆果.吃得快2倍.", obtain: "从丛林生物群系中的鹅莓灌木收获.", hunger: "3 (1.5 点)", saturation: "0.2 (很低)", other: "30% 堆肥几率", related: [{ name: "鹅莓灌木", icon: "textures/blocks/berries/gooseberries_bush/gooseberries_bush_stage_3", desc: "一种完全生长时会产生鹅莓的灌木.", obtain: "生成在丛林生物群系.", hunger: null, saturation: null }] },
        "幽灵浆果": { icon: "textures/items/ghostberries", desc: "来自苍白花园的苍白、半透明浆果.吃得快2倍.", obtain: "从苍白花园生物群系中的幽灵浆果灌木收获.", hunger: "3 (1.5 点)", saturation: "0.2 (很低)", other: "30% 堆肥几率", related: [{ name: "幽灵浆果灌木", icon: "textures/blocks/berries/ghostberries_bush/ghostberries_bush_stage_3", desc: "一种完全生长时会产生幽灵浆果的灌木.", obtain: "生成在苍白花园生物群系.", hunger: null, saturation: null }] },
        "蔓越莓": { icon: "textures/items/cranberries", desc: "在水附近发现的酸红浆果.吃得快2倍.", obtain: "从寒冷、红树林和河流生物群系中的蔓越莓灌木收获.", hunger: "3 (1.5 点)", saturation: "0.2 (很低)", other: "30% 堆肥几率", related: [{ name: "蔓越莓灌木", icon: "textures/blocks/berries/cranberries_bush/cranberries_bush_stage_3", desc: "一种完全生长时会产生蔓越莓的灌木.", obtain: "生成在寒冷、红树林和河流生物群系.", hunger: null, saturation: null }] },
        "匍匐树莓": { icon: "textures/items/creeping_raspberries", desc: "沿地面蔓延的野生树莓.吃得快2倍.", obtain: "从林地森林和巨型针叶林生物群系中的葡萄藤收获.", hunger: "3 (1.5 点)", saturation: "0.2 (很低)", other: "30% 堆肥几率", related: [{ name: "匍匐树莓灌木", icon: "textures/blocks/berries/creeping_raspberries_bush/creeping_raspberries_bush", desc: "一种生长低矮的葡萄藤，产生匍匐树莓.", obtain: "生成在林地森林和巨型针叶林生物群系.", hunger: null, saturation: null }] },
        "太妃坚果浆果": { icon: "textures/items/tofflenut_berries", desc: "来自太妃坚果灌木的甜、坚果味浆果.吃得快2倍.", obtain: "从热草原生物群系中的太妃坚果灌木收获.", hunger: "3 (1.5 点)", saturation: "0.2 (很低)", other: "用空瓶与灌木交互可收集太妃坚果树液\n30% 堆肥几率", related: [
            { name: "太妃坚果灌木", icon: "textures/blocks/berries/tofflenut_berries_bush/tofflenut_bush_stage3", desc: "一种完全生长时会产生太妃坚果浆果的灌木.", obtain: "生成在热草原生物群系.", hunger: null, saturation: null },
            { name: "太妃坚果树液", icon: "textures/items/tofflenut_sap", desc: "从太妃坚果灌木收集的粘稠树液.", obtain: "用空玻璃瓶与太妃坚果灌木交互.", hunger: "2 (1 点)", saturation: "0.2 (很低)", other: "给予饥饿效果\n堆叠到16" },
            { name: "太妃坚果糖浆", icon: "textures/items/tofflenut_syrup", desc: "从太妃坚果树液提炼出的甜糖浆.", obtain: "冶炼太妃坚果树液.", hunger: "6 (3 点)", saturation: "2.4 (超自然)", other: "堆叠到16", recipe: "§l§6冶炼:§r §7熔炉/烟熏炉/篝火/灵魂篝火§r\n太妃坚果树液 -> 太妃坚果糖浆" }
        ]}
    }},

    "作物": { icon: "textures/items/corn", items: {
        "玉米": { icon: "textures/items/corn", desc: "一穗金色玉米.", obtain: "在农田上种植玉米种子生长.", hunger: "4 (2 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", related: [
            { name: "野生玉米", icon: "textures/blocks/plants/wild_corn/wild_corn", desc: "一株野生玉米.", obtain: "生成在平原、草甸和向日葵平原.掉落玉米和玉米种子.有稀有概率掉落蓝玉米和蓝玉米种子.", hunger: null, saturation: null, other: "65% 堆肥几率" },
            { name: "玉米种子", icon: "textures/items/corn_seeds", desc: "用于种植玉米的种子.不可制作.", obtain: "从野生玉米或收获玉米作物掉落.", hunger: null, saturation: null, other: "30% 堆肥几率" },
            { name: "蓝玉米", icon: "textures/items/blue_corn", desc: "一种稀有的蓝玉米品种.", obtain: "在农田上种植蓝玉米种子生长.", hunger: "4 (2 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率" },
            { name: "蓝玉米种子", icon: "textures/items/blue_corn_seeds", desc: "用于种植蓝玉米的稀有种子.不可制作.", obtain: "仅从野生玉米或收获玉米作物时的稀有掉落.", hunger: null, saturation: null, other: "30% 堆肥几率" },
            { name: "玉米箱", icon: "textures/blocks/crop_crates/corn_crate_side", desc: "装满玉米的储存木箱.", obtain: "用玉米 x9 制作.可逆.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[玉米][玉米][玉米]\n[玉米][玉米][玉米]\n[玉米][玉米][玉米]\n§7= 玉米箱 x1§r" },
            { name: "蓝玉米箱", icon: "textures/blocks/crop_crates/blue_corn_crate_side", desc: "装满蓝玉米的储存木箱.", obtain: "用蓝玉米 x9 制作.可逆.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[蓝玉米][蓝玉米][蓝玉米]\n[蓝玉米][蓝玉米][蓝玉米]\n[蓝玉米][蓝玉米][蓝玉米]\n§7= 蓝玉米箱 x1§r" }
        ]},
        "番茄": { icon: "textures/items/tomato", desc: "一个成熟的红番茄.", obtain: "在农田上种植番茄种子生长.", hunger: "4 (2 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", related: [
            { name: "番茄种子", icon: "textures/items/tomato_seeds", desc: "用于种植番茄的种子.不可制作.", obtain: "从破坏落叶或荒漠灌木掉落.", hunger: null, saturation: null, other: "30% 堆肥几率" },
            { name: "番茄箱", icon: "textures/blocks/crop_crates/tomato_crate_side", desc: "装满番茄的储存木箱.", obtain: "用番茄 x9 制作.可逆.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[番茄][番茄][番茄]\n[番茄][番茄][番茄]\n[番茄][番茄][番茄]\n§7= 番茄箱 x1§r" }
        ]},
        "生菜": { icon: "textures/items/lettuce", desc: "一棵脆生菜.", obtain: "在农田上种植生菜种子生长.", hunger: "2 (1 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", related: [
            { name: "生菜种子", icon: "textures/items/lettuce_seeds", desc: "用于种植生菜的种子.不可制作.", obtain: "从破坏落叶或荒漠灌木掉落.", hunger: null, saturation: null, other: "30% 堆肥几率" },
            { name: "生菜箱", icon: "textures/blocks/crop_crates/lettuce_crate_side", desc: "装满生菜的储存木箱.", obtain: "用生菜 x9 制作.可逆.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[生菜][生菜][生菜]\n[生菜][生菜][生菜]\n[生菜][生菜][生菜]\n§7= 生菜箱 x1§r" }
        ]},
                "西兰花": { icon: "textures/items/broccoli", desc: "一颗新鲜的西兰花。", obtain: "在农田上从西兰花种子生长。", hunger: "4 (2 点)", saturation: "1.2 (普通)", other: "30% 堆肥几率", related: [
            { name: "西兰花种子", icon: "textures/items/broccoli_seeds", desc: "用于种植西兰花的种子。无法合成。", obtain: "从破坏落叶或沙漠灌木掉落。", hunger: null, saturation: null, other: "30% 堆肥几率" },
            { name: "西兰花箱", icon: "textures/blocks/crop_crates/broccoli_crate_side", desc: "装满西兰花的存储箱。", obtain: "从西兰花 x9 合成。可逆。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[西兰花][西兰花][西兰花]\n[西兰花][西兰花][西兰花]\n[西兰花][西兰花][西兰花]\n§7= 西兰花箱 x1§r" }
        ]},
        "花椰菜": { icon: "textures/items/cauliflower", desc: "一颗白色的花椰菜。", obtain: "在农田上从花椰菜种子生长。", hunger: "4 (2 点)", saturation: "1.2 (普通)", other: "30% 堆肥几率", related: [
            { name: "花椰菜种子", icon: "textures/items/cauliflower_seeds", desc: "用于种植花椰菜的种子。无法合成。", obtain: "从破坏落叶或沙漠灌木掉落。", hunger: null, saturation: null, other: "30% 堆肥几率" },
            { name: "花椰菜箱", icon: "textures/blocks/crop_crates/cauliflower_crate_side", desc: "装满花椰菜的存储箱。", obtain: "从花椰菜 x9 合成。可逆。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[花椰菜][花椰菜][花椰菜]\n[花椰菜][花椰菜][花椰菜]\n[花椰菜][花椰菜][花椰菜]\n§7= 花椰菜箱 x1§r" }
        ]},
        "西葫芦": { icon: "textures/items/zucchini", desc: "绿色的夏季南瓜。", obtain: "在农田上从西葫芦种子生长。", hunger: "4 (2 点)", saturation: "1.2 (普通)", other: "30% 堆肥几率", related: [
            { name: "西葫芦种子", icon: "textures/items/zucchini_seeds", desc: "用于种植西葫芦的种子。无法合成。", obtain: "从破坏落叶或沙漠灌木掉落。", hunger: null, saturation: null, other: "30% 堆肥几率" },
            { name: "西葫芦箱", icon: "textures/blocks/crop_crates/zucchini_crate_side", desc: "装满西葫芦的存储箱。", obtain: "从西葫芦 x9 合成。可逆。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[西葫芦][西葫芦][西葫芦]\n[西葫芦][西葫芦][西葫芦]\n[西葫芦][西葫芦][西葫芦]\n§7= 西葫芦箱 x1§r" }
        ]},
                "柿子": { icon: "textures/items/persimmon", desc: "甜美的橙色水果。", obtain: "在农田上从柿子种子生长。", hunger: "4 (2 点)", saturation: "1.2 (普通)", other: "30% 堆肥几率", related: [
            { name: "柿子种子", icon: "textures/items/persimmon_seeds", desc: "用于种植柿子的种子。无法合成。", obtain: "从破坏落叶或沙漠灌木掉落。", hunger: null, saturation: null, other: "30% 堆肥几率" },
            { name: "柿子箱", icon: "textures/blocks/crop_crates/persimmon_crate_side", desc: "装满柿子的存储箱。", obtain: "从柿子 x9 合成。可逆。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[柿子][柿子][柿子]\n[柿子][柿子][柿子]\n[柿子][柿子][柿子]\n§7= 柿子箱 x1§r" }
        ]},
        "红辣椒": { icon: "textures/items/red_chili_pepper", desc: "火辣的辣椒。小心！", obtain: "在农田上从红辣椒种子生长。", hunger: "4 (2 点)", saturation: "1.2 (普通)", other: "30% 堆肥几率", related: [
            { name: "红辣椒种子", icon: "textures/items/red_chili_pepper_seeds", desc: "用于种植辣辣椒的种子。无法合成。", obtain: "从破坏落叶或沙漠灌木掉落。", hunger: null, saturation: null, other: "30% 堆肥几率" },
            { name: "红辣椒箱", icon: "textures/blocks/crop_crates/red_chili_crate_side", desc: "装满红辣椒的存储箱。", obtain: "从红辣椒 x9 合成。可逆。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[红辣椒][红辣椒][红辣椒]\n[红辣椒][红辣椒][红辣椒]\n[红辣椒][红辣椒][红辣椒]\n§7= 红辣椒箱 x1§r" }
        ]},
                "甜椒": { icon: "textures/items/orange_pepper", desc: "甜椒，有红色、橙色、黄色和绿色品种。生长时颜色随机。", obtain: "在农田上从甜椒种子生长。", hunger: "4 (2 点)", saturation: "1.2 (普通)", other: "30% 堆肥几率", related: [
            { name: "红甜椒", icon: "textures/items/red_pepper", desc: "甜美的红色甜椒。", obtain: "从甜椒种子生长。颜色随机。", hunger: "4 (2 点)", saturation: "1.2 (普通)", other: "30% 堆肥几率" },
            { name: "橙甜椒", icon: "textures/items/orange_pepper", desc: "甜美的橙色甜椒。", obtain: "从甜椒种子生长。颜色随机。", hunger: "4 (2 点)", saturation: "1.2 (普通)", other: "30% 堆肥几率" },
            { name: "黄甜椒", icon: "textures/items/yellow_pepper", desc: "甜美的黄色甜椒。", obtain: "从甜椒种子生长。颜色随机。", hunger: "4 (2 点)", saturation: "1.2 (普通)", other: "30% 堆肥几率" },
            { name: "绿甜椒", icon: "textures/items/green_pepper", desc: "脆绿甜椒。", obtain: "从甜椒种子生长。颜色随机。", hunger: "4 (2 点)", saturation: "1.2 (普通)", other: "30% 堆肥几率" },
            { name: "甜椒种子", icon: "textures/items/bell_pepper_seeds", desc: "用于种植甜椒的种子。颜色随机。", obtain: "从破坏落叶或沙漠灌木掉落。", hunger: null, saturation: null, other: "30% 堆肥几率" },
            { name: "红甜椒箱", icon: "textures/blocks/crop_crates/red_bell_pepper_crate_side", desc: "一箱红甜椒。", obtain: "从红甜椒 x9 合成。可逆。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[红甜椒 x9]\n§7= 红甜椒箱 x1§r" },
            { name: "橙甜椒箱", icon: "textures/blocks/crop_crates/orange_bell_pepper_crate_side", desc: "一箱橙甜椒。", obtain: "从橙甜椒 x9 合成。可逆。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[橙甜椒 x9]\n§7= 橙甜椒箱 x1§r" },
            { name: "黄甜椒箱", icon: "textures/blocks/crop_crates/yellow_bell_pepper_crate_side", desc: "一箱黄甜椒。", obtain: "从黄甜椒 x9 合成。可逆。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[黄甜椒 x9]\n§7= 黄甜椒箱 x1§r" },
                    { name: "绿甜椒箱", icon: "textures/blocks/crop_crates/green_bell_pepper_crate_side", desc: "一箱绿甜椒。", obtain: "从绿甜椒 x9 合成。可逆。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[绿甜椒 x9]\n§7= 绿甜椒箱 x1§r" }
        ]},
        "大麦": { icon: "textures/items/barley", desc: "用于烘焙和酿造的大麦粒。生食不可食用。", obtain: "在农田上从大麦种子生长。", hunger: null, saturation: null, other: "30% 堆肥几率", related: [
            { name: "大麦种子", icon: "textures/items/barley_seeds", desc: "用于种植大麦的种子。无法合成。", obtain: "从破坏落叶或沙漠灌木掉落。", hunger: null, saturation: null, other: "30% 堆肥几率" },
            { name: "大麦箱", icon: "textures/blocks/crop_crates/barley_crate_side", desc: "装满大麦的存储箱。可以合成大麦干草块。", obtain: "从大麦 x9 合成。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[大麦][大麦][大麦]\n[大麦][大麦][大麦]\n[大麦][大麦][大麦]\n§7= 大麦箱 x1§r" },
            { name: "大麦干草块", icon: "textures/blocks/barley_hay_block_side", desc: "一捆干燥的大麦。可逆回大麦 x9。", obtain: "从大麦箱合成。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[大麦箱]\n§7= 大麦干草块 x1§r\n\n§7 大麦干草块 -> 大麦 x9§r" }
        ]},
        "黑麦": { icon: "textures/items/rye", desc: "用于烘焙的黑麦穗。不可食用。", obtain: "在农田上从黑麦种子生长。", hunger: null, saturation: null, other: "30% 堆肥几率", related: [
            { name: "黑麦种子", icon: "textures/items/rye_seeds", desc: "用于种植黑麦的种子。无法合成。", obtain: "从破坏落叶或沙漠灌木掉落。", hunger: null, saturation: null, other: "30% 堆肥几率" },
            { name: "黑麦箱", icon: "textures/blocks/crop_crates/rye_crate_side", desc: "装满黑麦的存储箱。可以合成黑麦干草块。", obtain: "从黑麦 x9 合成。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[黑麦][黑麦][黑麦]\n[黑麦][黑麦][黑麦]\n[黑麦][黑麦][黑麦]\n§7= 黑麦箱 x1§r" },
            { name: "黑麦干草块", icon: "textures/blocks/rye_hay_block_side", desc: "一捆干燥的黑麦。可逆回黑麦 x9。", obtain: "从黑麦箱合成。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[黑麦箱]\n§7= 黑麦干草块 x1§r\n\n§7 黑麦干草块 -> 黑麦 x9§r" }
        ]},
        "稻米": { icon: "textures/items/raw_rice", desc: "在水淹农田中生长的稻米。生食不可食用。", obtain: "在水淹农田上生长。从野生稻米获得。", hunger: null, saturation: null, other: "30% 堆肥几率", related: [
            { name: "野生稻米", icon: "textures/items/wild_rice", desc: "在浅水中生长的野生稻米。", obtain: "在丛林、沼泽和红树林沼泽生成。破坏时掉落生米。", hunger: null, saturation: null, other: "65% 堆肥几率" },
            { name: "稻米箱", icon: "textures/blocks/crop_crates/rice_crate_side", desc: "装满生米的存储箱。", obtain: "从生米 x9 合成。可逆。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[生米][生米][生米]\n[生米][生米][生米]\n[生米][生米][生米]\n§7= 稻米箱 x1§r" }
        ]},
        "大蒜": { icon: "textures/items/garlic", desc: "一颗辛辣的大蒜。收获时会自我种植。", obtain: "在大蒜上种植。从乌鸦大蒜获得。", hunger: "2 (1 点)", saturation: "1.2 (普通)", other: "30% 堆肥几率", related: [
            { name: "乌鸦大蒜", icon: "textures/items/crow_garlic", desc: "野生大蒜植物。", obtain: "在森林、沼泽和草甸生成。破坏时掉落大蒜。", hunger: null, saturation: null, other: "65% 堆肥几率" },
            { name: "大蒜箱", icon: "textures/blocks/crop_crates/garlic_crate_side", desc: "装满大蒜的存储箱。", obtain: "从大蒜x9合成。可逆。", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[大蒜][大蒜][大蒜]\n[大蒜][大蒜][大蒜]\n[大蒜][大蒜][大蒜]\n§7= Garlic Crate x1§r" }
        ]},
        "生姜": { icon: "textures/items/ginger", desc: "用于烹饪和调味的生姜根.不可食用.种植后会自动重新生成.", obtain: "通过破坏泥土和泥土相关方块获得.从缠根泥土中更容易获得.在农田上种植.", hunger: null, saturation: null, other: "30% 堆肥几率", related: [
            { name: "生姜箱", icon: "textures/blocks/crop_crates/ginger_crate_side", desc: "装满生姜根的储存木箱.", obtain: "用生姜 x9 制作.可逆.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[生姜][生姜][生姜]\n[生姜][生姜][生姜]\n[生姜][生姜][生姜]\n§7= 生姜箱 x1§r" }
        ]},
        "洋葱": { icon: "textures/items/spring_onion", desc: "新鲜的绿色小葱.", obtain: "在农田上种植.从野生洋葱植物获得.", hunger: "2 (1 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", related: [
            { name: "野生洋葱", icon: "textures/items/wild_onion_plant", desc: "野生洋葱.", obtain: "生成在沼泽、针叶林和森林.被破坏时掉落小葱.", hunger: null, saturation: null, other: "65% 堆肥几率" },
            { name: "红小葱", icon: "textures/items/red_spring_onion", desc: "红皮小葱.", obtain: "在农田上种植.", hunger: "2 (1 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率" },
            { name: "洋葱箱", icon: "textures/blocks/crop_crates/onion_crate_side", desc: "装满小葱的木箱.", obtain: "用小葱 x9 制作.可逆.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[小葱 x9]\n§7= 洋葱箱 x1§r" },
            { name: "红洋葱箱", icon: "textures/blocks/crop_crates/red_onion_crate_side", desc: "装满红小葱的木箱.", obtain: "用红小葱 x9 制作.可逆.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[红小葱 x9]\n§7= 红洋葱箱 x1§r" }
        ]},
        "大根": { icon: "textures/items/daikon", desc: "用于亚洲烹饪的大白萝卜.", obtain: "在农田上种植.从野生大根获得.", hunger: "2 (1 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", related: [
            { name: "野生大根", icon: "textures/items/wild_daikon", desc: "野生大根植物.", obtain: "生成在丛林.被破坏时掉落大根.", hunger: null, saturation: null, other: "65% 堆肥几率" },
            { name: "大根箱", icon: "textures/blocks/crop_crates/daikon_crate_side", desc: "装满大根的木箱.", obtain: "用大根 x9 制作.可逆.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[大根 x9]\n§7= 大根箱 x1§r" }
        ]},
        "欧防风": { icon: "textures/items/parsnip", desc: "一种甜的根菜，类似胡萝卜.", obtain: "在农田上种植.从野生根菜获得.", hunger: "2 (1 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", related: [{ name: "欧防风箱", icon: "textures/blocks/crop_crates/parsnip_crate_side", desc: "装满欧防风的木箱.", obtain: "用欧防风 x9 制作.可逆.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[欧防风 x9]\n§7= 欧防风箱 x1§r" }] },
        "萝卜": { icon: "textures/items/turnip", desc: "一种圆形根菜，味道温和.", obtain: "在农田上种植.从野生根菜获得.", hunger: "2 (1 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", related: [{ name: "萝卜箱", icon: "textures/blocks/crop_crates/turnip_crate_side", desc: "装满萝卜的木箱.", obtain: "用萝卜 x9 制作.可逆.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[萝卜 x9]\n§7= 萝卜箱 x1§r" }] },
        "小红萝卜": { icon: "textures/items/radish", desc: "一种小的、辛辣的红萝卜.", obtain: "在农田上种植.从野生根菜获得.", hunger: "2 (1 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", related: [{ name: "小红萝卜箱", icon: "textures/blocks/crop_crates/radish_crate_side", desc: "装满小红萝卜的木箱.", obtain: "用小红萝卜 x9 制作.可逆.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[小红萝卜 x9]\n§7= 小红萝卜箱 x1§r" }] },
        "彩色胡萝卜": { icon: "textures/items/rainbow_carrots", desc: "各种色彩的多色胡萝卜.", obtain: "在农田上种植.从野生胡萝卜获得.", hunger: "3 (1.5 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", related: [
            { name: "野生胡萝卜", icon: "textures/items/wild_carrot", desc: "一种野生胡萝卜，有小白花.", obtain: "生成在平原、草甸和森林.被破坏时掉落胡萝卜和彩色胡萝卜.", hunger: null, saturation: null, other: "65% 堆肥几率" },
            { name: "彩色胡萝卜箱", icon: "textures/blocks/crop_crates/rainbow_carrot_crate_side", desc: "装满彩色胡萝卜的木箱.", obtain: "用彩色胡萝卜 x9 制作.可逆.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[彩色胡萝卜 x9]\n§7= 彩色胡萝卜箱 x1§r" }
        ]},
        "红薯": { icon: "textures/items/sweet_potato", desc: "一种橙色根菜.烹饪后很甜.", obtain: "在农田上种植.从野生红薯获得.", hunger: "2 (1 点)", saturation: "1.2 (正常)", other: "30% 堆肥几率", related: [
            { name: "野生红薯", icon: "textures/items/wild_sweet_potato", desc: "野生红薯藤蔓.", obtain: "生成在针叶林、草甸和极地山脉.被破坏时掉落红薯.", hunger: null, saturation: null, other: "65% 堆肥几率" },
            { name: "红薯箱", icon: "textures/blocks/crop_crates/sweet_potato_crate_side", desc: "装满红薯的木箱.", obtain: "用红薯 x9 制作.可逆.", hunger: null, saturation: null, recipe: "§l§6食谱:§r §7工作台§r\n[红薯 x9]\n§7= 红薯箱 x1§r" }
        ]},
                "樱桃": { icon: "textures/items/cherries", desc: "一对鲜红的樱桃。", obtain: "在农田上从樱桃种子生长。", hunger: "4 (2 点)", saturation: "0.2 (低)", other: "30% 堆肥几率", related: [{ name: "樱桃箱", icon: "textures/blocks/crop_crates/cherry_crate_side", desc: "一箱樱桃。", obtain: "从樱桃 x9 合成。可逆。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[樱桃 x9]\n§7= 樱桃箱 x1§r" }] },
        "李子": { icon: "textures/items/plum", desc: "一种小而甜的紫色水果。", obtain: "在农田上从李子种子生长。", hunger: "4 (2 点)", saturation: "1.2 (普通)", other: "30% 堆肥几率", related: [{ name: "李子箱", icon: "textures/blocks/crop_crates/plum_crate_side", desc: "一箱李子。", obtain: "从李子 x9 合成。可逆。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[李子 x9]\n§7= 李子箱 x1§r" }] },
        "青苹果": { icon: "textures/items/green_apple", desc: "酸涩的青苹果。可以替代苹果用于金苹果、苹果果冻和苹果汁配方。", obtain: "在农田上从青苹果种子生长。", hunger: "4 (2 点)", saturation: "1.2 (普通)", other: "30% 堆肥几率", related: [{ name: "青苹果箱", icon: "textures/blocks/crop_crates/green_apple_crate_side", desc: "一箱青苹果。", obtain: "从青苹果 x9 合成。可逆。", hunger: null, saturation: null, recipe: "§l§6 食谱:§r §7 工作台§r\n[青苹果 x9]\n§7= 青苹果箱 x1§r" }] },
        "苍白南瓜": { icon: "textures/blocks/pumpkins_melons/white_pumpkin_side", desc: "在苍白花园中发现的苍白南瓜。可以剪刀雕刻，合成种子、派，或用于生成铜、铁和雪傀儡。", obtain: "在苍白花园生物群系中生成。", hunger: null, saturation: null, other: "可以生成铜、铁和雪傀儡\n用剪刀雕刻得到雕刻苍白南瓜", related: [
            { name: "苍白南瓜种子", icon: "textures/items/white_pumpkin_seeds", desc: "用于种植苍白南瓜的种子。", obtain: "从苍白南瓜合成（产出 4 个种子）。", hunger: null, saturation: null, other: "30% 堆肥几率" },
            { name: "苍白南瓜派", icon: "textures/items/white_pumpkin_pie", desc: "由苍白南瓜制成的奶油派。可以放置。", obtain: "苍白南瓜 + 糖 + 蛋（任何类型） - 无序合成。", hunger: "8 (4 点)", saturation: "0.6 (低)", other: "可放置\n100% 堆肥几率", recipe: "§l§6 食谱:§r §7 工作台 (无序合成)§r\n[苍白南瓜] + [糖] + [鸡蛋]\n§7= 苍白南瓜派 x1§r" },
            { name: "雕刻苍白南瓜", icon: "textures/blocks/pumpkins_melons/white_carved_pumpkin_front", desc: "雕刻的苍白南瓜。用于合成杰克南瓜灯变体。", obtain: "用剪刀雕刻苍白南瓜。在工作台单独合成以制作可穿戴物品。可穿戴物品可以通过铁砧附魔诅咒。", hunger: null, saturation: null, other: "可穿戴版本：无覆盖，在物品栏中反向显示" },
            { name: "苍白杰克南瓜灯", icon: "textures/blocks/pumpkins_melons/white_jack_o_lantern_front", desc: "发光的苍白杰克南瓜灯。", obtain: "雕刻苍白南瓜 + 火把。", hunger: null, saturation: null },
            { name: "苍白铜杰克南瓜灯", icon: "textures/blocks/pumpkins_melons/white_copper_jack_o_lantern_front", desc: "带有温暖铜色光芒的苍白杰克南瓜灯。", obtain: "雕刻苍白南瓜 + 铜火把。", hunger: null, saturation: null },
            { name: "苍白灵魂杰克南瓜灯", icon: "textures/blocks/pumpkins_melons/white_soul_jack_o_lantern_front", desc: "带有诡异灵魂火焰的苍白杰克南瓜灯。", obtain: "雕刻苍白南瓜 + 灵魂火把。", hunger: null, saturation: null },
            { name: "灵魂杰克南瓜灯", icon: "textures/blocks/pumpkins_melons/soul_jack_o_lantern_front", desc: "带有令人毛骨悚然灵魂火焰的杰克南瓜灯。", obtain: "雕刻南瓜 + 灵魂火把。", hunger: null, saturation: null },
            { name: "铜杰克南瓜灯", icon: "textures/blocks/pumpkins_melons/copper_jack_o_lantern_front", desc: "带有温暖铜色光芒的杰克南瓜灯。", obtain: "雕刻南瓜 + 铜火把。", hunger: null, saturation: null }
        ]}
    }},

    "植物与花卉": { icon: "textures/items/lavender_plant", items: {
        "龙舌兰": { icon: "textures/items/aguave_plant", desc: "一种叶片厚实的肉质沙漠植物.", obtain: "生成在恶地生物群系.", hunger: null, saturation: null, other: "65% 堆肥几率" },
        "荒漠灌木": { icon: "textures/blocks/plants/desert_shrub/desert_shrub", desc: "一种在干旱气候中生存的坚硬、干燥的灌木.", obtain: "生成在恶地、沙漠和热草原生物群系.", hunger: null, saturation: null, other: "破坏时掉落随机作物种子\n65% 堆肥几率" },
        "小豆茎": { icon: "textures/items/small_beanstalk", desc: "一颗从地面生长出的小豆茎.", obtain: "生成在森林生物群系.", hunger: null, saturation: null, other: "65% 堆肥几率" },
        "野生根菜": { icon: "textures/items/wild_root_vegetable", desc: "一种无法识别的野生根菜.", obtain: "生成在针叶林和森林生物群系.破坏时掉落随机根菜（欧防风、萝卜或小红萝卜）.", hunger: null, saturation: null, other: "65% 堆肥几率" },
        "芜菁花": { icon: "textures/items/mustard_flower", desc: "一种明亮的黄色野生花卉.偶尔有概率掉落芜菁种子.可以制作成黄色染料.", obtain: "生成在花卉森林和热草原生物群系.", hunger: null, saturation: null, other: "可制作成黄色染料\n用骨粉生长\n65% 堆肥几率", related: [
            { name: "芜菁种子", icon: "textures/items/mustard", desc: "可食用的种子，在草地或泥土上生长成芜菁灌木.吃得快2倍.", obtain: "从芜菁灌木收获，或偶尔从芜菁花掉落.", hunger: "2 (1 点)", saturation: "0.2 (很低)", other: "30% 堆肥几率" },
            { name: "芜菁灌木", icon: "textures/blocks/plants/mustard_stage_1/mustard_stage_1", desc: "通过在草地或泥土上种植芜菁种子生长的作物灌木.", obtain: "在草地或泥土上种植芜菁种子，或生成在平原、森林和热草原.", hunger: null, saturation: null }
        ]},
        "芜菁灌木": { icon: "textures/blocks/plants/mustard_stage_1/mustard_stage_1", desc: "通过在草地或泥土上种植芜菁种子生长的作物灌木.像浆果一样收获芜菁种子.", obtain: "在草地或泥土上种植芜菁种子，或生成在平原、森林和热草原生物群系.", hunger: null, saturation: null, related: [
            { name: "芜菁种子", icon: "textures/items/mustard", desc: "可食用的种子，生长成芜菁灌木.吃得快2倍.", obtain: "从芜菁灌木收获，或偶尔从芜菁花掉落.", hunger: "2 (1 点)", saturation: "0.2 (很低)", other: "30% 堆肥几率" },
            { name: "芜菁花", icon: "textures/items/mustard_flower", desc: "一种明亮的黄色野生花卉.偶尔有概率掉落芜菁种子.", obtain: "生成在花卉森林和热草原生物群系.", hunger: null, saturation: null, other: "用骨粉生长\n65% 堆肥几率" }
        ]},
        "薰衣草": { icon: "textures/items/lavender_plant", desc: "一种芬芳的紫色薰衣草植物.可以制作成紫色染料.", obtain: "生成在平原、花卉森林和樱花林生物群系.", hunger: null, saturation: null, other: "可制作成紫色染料\n用骨粉生长\n65% 堆肥几率" },
        "山薰衣草": { icon: "textures/items/mountain_lavender_plant", desc: "一种在高海拔地区发现的耐寒薰衣草.可以制作成紫色染料.", obtain: "生成在极地山脉、石峰、锯齿峰和积雪斜坡生物群系.", hunger: null, saturation: null, other: "可制作成紫色染料\n用骨粉生长\n65% 堆肥几率" },
        "金莲花": { icon: "textures/items/nasturtiums", desc: "彩色的橙花.可以制作成橙色染料.", obtain: "生成在花卉森林、丛林和热草原生物群系.", hunger: null, saturation: null, other: "可制作成橙色染料\n用骨粉生长\n65% 堆肥几率" },
        "橙番红花": { icon: "textures/items/orange_crocus", desc: "一种小的橙色番红花.可以制作成橙色染料.", obtain: "生成在花卉森林和草甸生物群系.", hunger: null, saturation: null, other: "可制作成橙色染料\n用骨粉生长\n65% 堆肥几率" },
        "紫番红花": { icon: "textures/items/purple_crocus", desc: "一种小的紫色番红花.可以制作成紫色染料.", obtain: "生成在花卉森林和草甸生物群系.", hunger: null, saturation: null, other: "可制作成紫色染料\n用骨粉生长\n65% 堆肥几率" },
        "白番红花": { icon: "textures/items/white_crocus", desc: "一种小的白色番红花.可以制作成白色染料.", obtain: "生成在花卉森林和草甸生物群系.", hunger: null, saturation: null, other: "可制作成白色染料\n用骨粉生长\n65% 堆肥几率" }
    }},

    "生物": { icon: "textures/items/turkey_spawn_egg", items: {
        "火鸡": { icon: "textures/items/turkey_spawn_egg", desc: "一种被动农场鸟类.可以繁殖和饲养以获得肉、羽毛和蛋.", obtain: "自然生成在森林和针叶林生物群系.\n繁殖：使用种子\n掉落物：生的火鸡、火鸡羽毛\n特殊：定期产卵", hunger: null, saturation: null, related: [
            { name: "生的火鸡", icon: "textures/items/raw_turkey", desc: "未烹饪的火鸡肉.可以放置.给予饥饿效果.", obtain: "火鸡死亡时掉落.", hunger: "2 (1 点)", saturation: "1.6 (好)", other: "可以放置\n给予饥饿效果" },
            { name: "熟的火鸡", icon: "textures/items/cooked_turkey", desc: "一只多汁的熟火鸡.可以放置.", obtain: "冶炼生的火鸡.", hunger: "8 (4 点)", saturation: "1.6 (好)", other: "可以放置", recipe: "§l§6冶炼:§r §7熔炉/烟熏炉/篝火/灵魂篝火§r\n生的火鸡 -> 熟的火鸡" },
            { name: "生的火鸡腿", icon: "textures/items/raw_turkey_leg", desc: "生的火鸡鼓腿.像剑一样握着.给予饥饿效果.", obtain: "从生的火鸡制作（无定形）.", hunger: "1 (0.5 点)", saturation: "0.6 (很低)", other: "像剑一样握着\n给予饥饿效果", recipe: "§l§6食谱:§r §7工作台 (无定形)§r\n[生的火鸡]\n§7= 生的火鸡腿 x2§r" },
            { name: "熟的火鸡腿", icon: "textures/items/cooked_turkey_leg", desc: "一条完美烤制的火鸡鼓腿.像剑一样握着.", obtain: "冶炼生的火鸡腿.也可以从熟的火鸡制作（无定形）.", hunger: "2 (1 点)", saturation: "1.6 (好)", other: "像剑一样握着", recipe: "§l§6冶炼:§r §7熔炉/烟熏炉/篝火/灵魂篝火§r\n生的火鸡腿 -> 熟的火鸡腿\n\n§l§6食谱:§r §7工作台 (无定形)§r\n[熟的火鸡]\n§7= 熟的火鸡腿 x2§r" },
            { name: "火鸡羽毛", icon: "textures/items/turkey_feather", desc: "从火鸡上摘下的羽毛.可以用作大多数食谱中的羽毛.", obtain: "火鸡死亡时掉落.", hunger: null, saturation: null },
            { name: "火鸡蛋", icon: "textures/items/turkey_egg", desc: "火鸡产下的蛋.可以扔掉或在食谱中用作蛋.", obtain: "火鸡定期掉落.", hunger: null, saturation: null }
        ]}
    }}
};

// ============================================================
//  助手 + 表单导航
// ============================================================

function buildDetailBody(item) {
    let b = `§7${item.desc}§r\n\n§l§e获取方式：§r\n§7${item.obtain}§r`;
    if (item.hunger !== null && item.hunger !== undefined) b += `\n\n§l§a食物属性：§r\n§7饥饿值: §f${item.hunger}§r\n§7饱和度: §f${item.saturation}§r`;
    if (item.other) b += `\n\n§l§d其他：§r\n§7${item.other}§r`;
    if (item.recipe) b += `\n\n${item.recipe}`;
    return b;
}

async function showWithRetry(player, formFn) {
    const MAX = 5;
    for (let i = 0; i < MAX; i++) {
        const r = await formFn(player);
        if (r.cancelationReason !== "UserBusy") return r;
        await new Promise(res => { system.runTimeout(() => res(), 5); });
    }
    return { canceled: true };
}

function openGuidebook(player) {
    const cats = Object.keys(CATEGORIES);
    player.playSound("open.book");
    system.run(async () => {
        const f = new ActionFormData().title("§l§1Guidebook §r§8- Food Expansion").body("§7Select a category to browse:§r");
        for (const n of cats) f.button(n, CATEGORIES[n].icon);
        const r = await showWithRetry(player, p => f.show(p));
        if (r.canceled || r.selection === undefined) return;
        player.playSound("random.page_turn");
        openCategory(player, cats[r.selection]);
    });
}

function openCategory(player, cat) {
    const c = CATEGORIES[cat];
    if (c.subcategories) {
        const subs = Object.keys(c.subcategories);
        system.run(async () => {
            const f = new ActionFormData().title(`§l§1${cat}`).body("§7Choose a type:§r");
            for (const s of subs) f.button(s, c.subcategories[s].icon);
            f.button("§c<- 返回分类");
            const r = await showWithRetry(player, p => f.show(p));
            if (r.canceled || r.selection === undefined) return;
            player.playSound("random.page_turn");
            if (r.selection === subs.length) openGuidebook(player);
            else openSubcategory(player, cat, subs[r.selection]);
        });
        return;
    }
    const items = Object.keys(c.items);
    system.run(async () => {
        const f = new ActionFormData().title(`§l§1${cat}`).body(`§7${items.length} entries. Tap to view details.§r`);
        for (const n of items) f.button(n, c.items[n].icon);
        f.button("§c<- 返回分类");
        const r = await showWithRetry(player, p => f.show(p));
        if (r.canceled || r.selection === undefined) return;
        player.playSound("random.page_turn");
        if (r.selection === items.length) openGuidebook(player);
        else openItemDetail(player, cat, items[r.selection]);
    });
}

function openSubcategory(player, parent, sub) {
    const s = CATEGORIES[parent].subcategories[sub];
    const items = Object.keys(s.items);
    system.run(async () => {
        const f = new ActionFormData().title(`§l§1${sub}`).body(`§7${items.length} entries. Tap to view details.§r`);
        for (const n of items) f.button(n, s.items[n].icon);
        f.button(`§c<- 返回${parent}`);
        const r = await showWithRetry(player, p => f.show(p));
        if (r.canceled || r.selection === undefined) return;
        player.playSound("random.page_turn");
        if (r.selection === items.length) openCategory(player, parent);
        else openSubItemDetail(player, parent, sub, items[r.selection]);
    });
}

function openSubItemDetail(player, parent, sub, itemName) {
    const item = CATEGORIES[parent].subcategories[sub].items[itemName];
    const b = buildDetailBody(item);
    system.run(async () => {
        const f = new ActionFormData().title(`§l${itemName}`).body(b);
        f.button(`§c<- 返回${sub}`);
        const r = await showWithRetry(player, p => f.show(p));
        if (r.canceled || r.selection === undefined) return;
        if (r.selection === 0) { player.playSound("random.page_turn"); openSubcategory(player, parent, sub); }
    });
}

function openItemDetail(player, cat, itemName) {
    const item = CATEGORIES[cat].items[itemName];
    let b = buildDetailBody(item);
    const rel = item.related || [];
    if (rel.length > 0) b += `\n\n§l§b相关物品：§r §7(点击下方)§r`;
    system.run(async () => {
        const f = new ActionFormData().title(`§l${itemName}`).body(b);
        for (const r of rel) f.button(r.name, r.icon);
        f.button(`§c<- 返回${cat}`);
        const r = await showWithRetry(player, p => f.show(p));
        if (r.canceled || r.selection === undefined) return;
        player.playSound("random.page_turn");
        if (r.selection === rel.length) openCategory(player, cat);
        else openRelatedDetail(player, cat, itemName, rel[r.selection]);
    });
}

function openRelatedDetail(player, cat, parent, rel) {
    const b = buildDetailBody(rel);
    system.run(async () => {
        const f = new ActionFormData().title(`§l${rel.name}`).body(b);
        f.button(`§c<- 返回${parent}`);
        const r = await showWithRetry(player, p => f.show(p));
        if (r.canceled || r.selection === undefined) return;
        if (r.selection === 0) { player.playSound("random.page_turn"); openItemDetail(player, cat, parent); }
    });
}

world.afterEvents.itemUse.subscribe((e) => {
    if (e.itemStack.typeId === "mp:guidebook") openGuidebook(e.source);
});