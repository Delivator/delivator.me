const dic = {
  az: "abcdefghijklmnopqrstuvwxyz",
  AZ: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  dig: "0123456789",
  special: "!#$%&()*+,-.:;<>=?@[]_"
};

let randomDic = "";

function get(id) {
  return document.getElementById(id);
}

function generatePassword(chars, length) {
  let pw = "";
  chars = [...chars];
  for (let i = 0; i < length; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)];
  }
  return pw;
}

let check_az = get("az"),
    check_AZ = get("AZ"),
    check_dig = get("dig"),
    check_special = get("special"),
    leng = get("length"),
    additional = get("additional"),
    select_presets = get("presets"),
    output = get("output");

output.onclick = () => {
  document.execCommand("copy");
}

output.addEventListener("copy", (event) => {
  event.preventDefault();
  if (event.clipboardData) {
    event.clipboardData.setData("text/plain", output.innerText);
    M.toast({html: "Password copied to clipboard!", classes: "green", displayLength: 3000});
  }
});

function loadPreset(preset) {
  if (!preset) preset = settings.presets[presets.selectedIndex];
  check_az.checked = preset.az;
  check_AZ.checked = preset.AZ;
  check_dig.checked = preset.dig;
  check_special.checked = preset.special;
  leng.value = preset.leng;
  additional.value = preset.additional;
  generate();
  M.updateTextFields();
}

function loadPresets() {
  for (let i = 0; i < settings.presets.length; i++) {
    let option = document.createElement("option");
    option.text = settings.presets[i].name;
    select_presets.add(option, i)
  }
  M.FormSelect.init(presets);
}

function updateDic() {
  randomDic = "";
  if (check_az.checked) randomDic += dic.az;
  if (check_AZ.checked) randomDic += dic.AZ;
  if (check_dig.checked) randomDic += dic.dig;
  if (check_special.checked) randomDic += dic.special;
  if (additional.value) randomDic += additional.value;
}

function generate() {
  updateDic();
  if (randomDic === "") return M.toast({html: "Used characters can't be empty!", classes: "red"});
  if (leng.value < 1) return M.toast({html: "Password length must be atleast 1!", classes: "red"});
  let pw = generatePassword(randomDic, leng.value);
  output.innerText = pw;
}

function reset() {
  localStorage.clear();
  location.reload();
}

let settings = localStorage.getItem("settings");

document.addEventListener("DOMContentLoaded", () => {
  M.AutoInit();

  if (!settings) {
    settings = {
      version: "1.0",
      presets: [{
        name: "Default",
        az: true,
        AZ: true,
        dig: true,
        special: false,
        leng: 16,
        additional: ""
      }, {
        name: "All",
        az: true,
        AZ: true,
        dig: true,
        special: true,
        leng: 16,
        additional: ""
      }, {
        name: "Emoji 😂",
        az: false,
        AZ: false,
        dig: false,
        special: false,
        leng: 16,
        additional: "😀😁😂🤣😃😄😅😆😉😊😋😎😍😘😗😙😚☺️🙂🤗🤩🤔🤨😐😑😶🙄😏😣😥😮🤐😯😪😫😴😌😛😜😝🤤😒😓😔😕🙃🤑😲☹️🙁😖😞😟😤😢😭😦😧😨😩🤯😬😰😱😳🤪😵😡😠🤬😷🤒🤕🤢🤮🤧😇🤠🤡🤥🤫🤭🧐🤓😈👿👹👺💀👻👽🤖💩😺😸😹😻😼😽🙀😿😾🤳💪👈👉☝️👆🖕👇✌️🤞🖖🤘🖐✋👌👍👎✊👊🤛🤜🤚👋🤟✍️👏👐🙌🤲🙏🤝💅👂👃👣👀👁🧠👅👄💋"
      }]
    }
    localStorage.setItem("settings", JSON.stringify(settings));

  } else {
    settings = JSON.parse(localStorage.getItem("settings"));
  }
  console.log(settings);
  loadPreset(settings.presets[0]);
  loadPresets();
  generate();
});
