const Discordie = require("discordie");
const Events = Discordie.Events;
const Client = new Discordie();
const Config = require("./config.json");

var Reason = "";
var Message;

Client.connect({ token: Config.token });

Client.Dispatcher.on(Events.GATEWAY_READY, e => {
	console.log(`Bot wystartowal, posiada nazwe: ${Client.User.username}.`); 
});

Client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
	var message = e.message
	if(message.author.bot) return;
	if(message.content.indexOf(Config.prefix) !== 0) return;

	const args = message.content.slice(Config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	const ChannelCheck = false;


	if (message.member.can(Discordie.Permissions.General.KICK_MEMBERS, message.guild) == true){
		if (ChannelCheck === false) {
			if (command === "help") {
				message.reply("Dostępne komendy to:\n***```$revive <ID> - revive'uje gracza o danym ID```***\n***```$skin <ID> - nadaje /skin osobie o danym ID```***\n***```$ogloszenie <TREŚĆ> - wysyła ogłoszenie o danej treści na serwer```***\n***```$start <TREŚĆ> - uruchamia plik na serwerze```***\n***```$stop <TREŚĆ> - wyłącza plik na serwerze```***\n***```$restart <TREŚĆ> - restartuje plik na serwerze```***\n***```$refresh - odświeża listę zasobów```***");
				return message.delete().catch(O_o=>{}); 
			};
		};
		
		switch(command) {
			case "xd":
				print(message.member.can(Discordie.Permissions.General.KICK_MEMBERS, message.guild));
			break;
			case "revive":
				var ServerID = parseInt(args[0], 10);
				if(ServerID) {
					if (ServerID < 10){
						ServerID = "0" + ServerID;
					}
					emit("Frosher:Req", command, ServerID, "empty");
					message.reply("***```Gracz o ID: " + ServerID + " został zrevive'owany.```***")
				}else {
					message.reply("Nic nie podano")
				};
				break;
				case "skin":
				var ServerID = parseInt(args[0], 10);
				if(ServerID) {
					if (ServerID < 10){
						ServerID = "0" + ServerID;
					}
					emit("Frosher:Req", command, ServerID, "empty");
					message.reply("***```Gracz o ID: " + ServerID + " otrzymał menu postaci.```***")
				}else {
					message.reply("Nic nie podano")
				};
				break;
				          case "ogloszenie":
                if(!args) {
                    message.reply("Nie podano ogloszenia")
                } else {
                let tekst = ""
                    args.forEach(arg => {
                    tekst += `${arg} `
                })
                    emit("Frosher:Req", command, tekst, "empty");
                    message.reply("***Wysłano ogłoszenie.***")
}
								break;
								case "stop":
									if (args.length === 1 || args[0] !== "<RESOURCE_NAME>") {
										emit("Frosher:Req", command, args[0]);
										message.reply("Plik o nazwie **" + args + "** został wyłączony.")
									} else {
										message.reply("ERROR!\nNazwa pliku nie może zawierać spacji");
									};
									break;
			case "start":
				if (args.length === 1 || args[0] !== "<RESOURCE_NAME>") {
					emit("Frosher:Req", command, args[0]);
					message.reply("Plik o nazwie **" + args + "** został włączony.")
				} else {
					message.reply("ERROR!\nNazwa pliku nie może zawierać spacji");
				};
				break;
				case "restart":
					if (args.length === 1 || args[0] !== "<RESOURCE_NAME>") {
						emit("Frosher:Req", command, args[0]);
						message.reply("Plik o nazwie **" + args + "** został zrestartowany.")
					} else {
						message.reply("ERROR!\nNazwa pliku nie może zawierać spacji");
					};
					break;
					case "refresh":
				if (args.length === 0) {
					emit("Frosher:Req", command);
					message.reply("Pliki zostały odświeżone")
				} else {
					message.reply("ERROR!\nTBrak nie ma żadnych argumentów.");
				};
				break;
				
			default:
		};
	} else {
		message.reply("Nie masz permisji do takich komend!")
	};
});

on('Frosher:Res', (Command, ResponseValue1, ResponseValue2, ResponseValue3) => {
	ReturnMessageToDiscord(Command, ResponseValue1, ResponseValue2, ResponseValue3);
});


