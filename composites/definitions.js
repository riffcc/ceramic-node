// This is an auto-generated file, do not edit manually
export const definition = {"models":{"Admin":{"id":"kjzl6hvfrbw6c9m54j0br516x9qni301svyu6onzxbsifcjusuzwhh6kgdrkigl","accountRelation":{"type":"list"}},"Piece":{"id":"kjzl6hvfrbw6c9ks4j3t143lynpqd0rcdvv9qz887k329mnkyhebil9xsvqsqmb","accountRelation":{"type":"list"}},"PinLike":{"id":"kjzl6hvfrbw6c8lk6odvtq2iw1bzq0zt0lbtcf0x4yj6bbrtfr7g8ct80mtnjqy","accountRelation":{"type":"list"}},"PinDislike":{"id":"kjzl6hvfrbw6ca97ehex06zmkkwllyljemkrfgk6rpnqucs1yn6eo8dywc9s82i","accountRelation":{"type":"list"}},"Subscription":{"id":"kjzl6hvfrbw6c56ctk0dpd3uqcx77dqjpgti4uthnj2wezaz18jzavay1wwd24b","accountRelation":{"type":"list"}},"Category":{"id":"kjzl6hvfrbw6c8yy6avq6svy30fwtlvjygkhkknt7ndd2ryyio8xhxx4pb5g4nh","accountRelation":{"type":"list"}},"Featured":{"id":"kjzl6hvfrbw6c9to4ad9dqh45v5rlizmv11j6bvwwpyrj1te3ykfabu5wpsj916","accountRelation":{"type":"list"}},"Website":{"id":"kjzl6hvfrbw6c79umg416zn1u52s57rhmmyivi4sz019znaoysjufo5cjafp4fq","accountRelation":{"type":"list"}},"Pin":{"id":"kjzl6hvfrbw6c8hemzan3c0bdwka10ezqalv1j18dm6b0pkt9crig2b0cpdj3az","accountRelation":{"type":"list"}},"Artist":{"id":"kjzl6hvfrbw6c8ovhe8v7kk89n5uplrh3v19tnkckl1rvd3fp229l11jho9gqum","accountRelation":{"type":"list"}},"EthAccount":{"id":"kjzl6hvfrbw6c6rwv5wk81hkhmdezy89bb90nz9o41wqw87xabterzgm8imb30l","accountRelation":{"type":"list"}}},"objects":{"AdminMetadata":{"createdAt":{"type":"string","required":true},"updatedAt":{"type":"string","required":true}},"Admin":{"super":{"type":"boolean","required":true},"adminID":{"type":"streamid","required":true},"inactive":{"type":"boolean","required":false},"metadata":{"type":"reference","refType":"object","refName":"AdminMetadata","required":true},"websiteID":{"type":"streamid","required":true},"admin":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c6rwv5wk81hkhmdezy89bb90nz9o41wqw87xabterzgm8imb30l","property":"adminID"}},"website":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c79umg416zn1u52s57rhmmyivi4sz019znaoysjufo5cjafp4fq","property":"websiteID"}}},"PieceDetails":{"tags":{"type":"string","required":false},"type":{"type":"string","required":false},"media":{"type":"string","required":false},"IMDBID":{"type":"string","required":false},"TMDBID":{"type":"string","required":false},"format":{"type":"string","required":false},"poster":{"type":"string","required":false},"bitrate":{"type":"string","required":false},"albumTitle":{"type":"string","required":false},"releaseType":{"type":"string","required":false},"musicBrainzID":{"type":"string","required":false},"imageThumbnailCID":{"type":"string","required":false},"initialReleaseYear":{"type":"string","required":false},"releaseDescription":{"type":"string","required":false}},"PieceMetadata":{"createdAt":{"type":"string","required":true},"updatedAt":{"type":"string","required":true}},"Piece":{"CID":{"type":"string","required":false},"name":{"type":"string","required":false},"details":{"type":"reference","refType":"object","refName":"PieceDetails","required":false},"metadata":{"type":"reference","refType":"object","refName":"PieceMetadata","required":true}},"PinLike":{"pinID":{"type":"streamid","required":true},"ownerID":{"type":"streamid","required":true},"categoryID":{"type":"streamid","required":true},"pin":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c8hemzan3c0bdwka10ezqalv1j18dm6b0pkt9crig2b0cpdj3az","property":"pinID"}},"owner":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c6rwv5wk81hkhmdezy89bb90nz9o41wqw87xabterzgm8imb30l","property":"ownerID"}},"category":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c8yy6avq6svy30fwtlvjygkhkknt7ndd2ryyio8xhxx4pb5g4nh","property":"categoryID"}}},"PinDislike":{"pinID":{"type":"streamid","required":true},"ownerID":{"type":"streamid","required":true},"categoryID":{"type":"streamid","required":true},"pin":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c8hemzan3c0bdwka10ezqalv1j18dm6b0pkt9crig2b0cpdj3az","property":"pinID"}},"owner":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c6rwv5wk81hkhmdezy89bb90nz9o41wqw87xabterzgm8imb30l","property":"ownerID"}},"category":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c8yy6avq6svy30fwtlvjygkhkknt7ndd2ryyio8xhxx4pb5g4nh","property":"categoryID"}}},"SubscriptionMetadata":{"createdAt":{"type":"string","required":true},"updatedAt":{"type":"string","required":true}},"Subscription":{"inactive":{"type":"boolean","required":false},"metadata":{"type":"reference","refType":"object","refName":"SubscriptionMetadata","required":true},"websiteID":{"type":"streamid","required":true},"subscribedID":{"type":"streamid","required":true},"website":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c79umg416zn1u52s57rhmmyivi4sz019znaoysjufo5cjafp4fq","property":"websiteID"}},"subscribedWebsite":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c79umg416zn1u52s57rhmmyivi4sz019znaoysjufo5cjafp4fq","property":"subscribedID"}}},"Category":{"name":{"type":"string","required":true},"websiteID":{"type":"streamid","required":true},"website":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c79umg416zn1u52s57rhmmyivi4sz019znaoysjufo5cjafp4fq","property":"websiteID"}},"pins":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c8hemzan3c0bdwka10ezqalv1j18dm6b0pkt9crig2b0cpdj3az","property":"categoryID"}},"pinsCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c8hemzan3c0bdwka10ezqalv1j18dm6b0pkt9crig2b0cpdj3az","property":"categoryID"}},"likes":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c8lk6odvtq2iw1bzq0zt0lbtcf0x4yj6bbrtfr7g8ct80mtnjqy","property":"categoryID"}},"likesCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c8lk6odvtq2iw1bzq0zt0lbtcf0x4yj6bbrtfr7g8ct80mtnjqy","property":"categoryID"}},"dislikes":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6ca97ehex06zmkkwllyljemkrfgk6rpnqucs1yn6eo8dywc9s82i","property":"categoryID"}},"dislikesCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6ca97ehex06zmkkwllyljemkrfgk6rpnqucs1yn6eo8dywc9s82i","property":"categoryID"}}},"Featured":{"endAt":{"type":"string","required":true},"pinID":{"type":"streamid","required":true},"startAt":{"type":"string","required":true},"websiteID":{"type":"streamid","required":true},"pin":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c8hemzan3c0bdwka10ezqalv1j18dm6b0pkt9crig2b0cpdj3az","property":"pinID"}},"website":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c79umg416zn1u52s57rhmmyivi4sz019znaoysjufo5cjafp4fq","property":"websiteID"}}},"WebsiteMetadata":{"createdAt":{"type":"string","required":true},"updatedAt":{"type":"string","required":true}},"Website":{"image":{"type":"string","required":false},"metadata":{"type":"reference","refType":"object","refName":"WebsiteMetadata","required":true},"description":{"type":"string","required":false},"websiteName":{"type":"string","required":true},"categories":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c8yy6avq6svy30fwtlvjygkhkknt7ndd2ryyio8xhxx4pb5g4nh","property":"websiteID"}},"categoriesCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c8yy6avq6svy30fwtlvjygkhkknt7ndd2ryyio8xhxx4pb5g4nh","property":"websiteID"}},"pins":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c8hemzan3c0bdwka10ezqalv1j18dm6b0pkt9crig2b0cpdj3az","property":"websiteID"}},"pinsCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c8hemzan3c0bdwka10ezqalv1j18dm6b0pkt9crig2b0cpdj3az","property":"websiteID"}},"featured":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c9to4ad9dqh45v5rlizmv11j6bvwwpyrj1te3ykfabu5wpsj916","property":"websiteID"}},"featuredCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c9to4ad9dqh45v5rlizmv11j6bvwwpyrj1te3ykfabu5wpsj916","property":"websiteID"}},"subscriptions":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c56ctk0dpd3uqcx77dqjpgti4uthnj2wezaz18jzavay1wwd24b","property":"websiteID"}},"subscriptionsCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c56ctk0dpd3uqcx77dqjpgti4uthnj2wezaz18jzavay1wwd24b","property":"websiteID"}},"admins":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c9m54j0br516x9qni301svyu6onzxbsifcjusuzwhh6kgdrkigl","property":"websiteID"}},"adminsCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c9m54j0br516x9qni301svyu6onzxbsifcjusuzwhh6kgdrkigl","property":"websiteID"}},"users":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c6rwv5wk81hkhmdezy89bb90nz9o41wqw87xabterzgm8imb30l","property":"websiteID"}},"usersCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c6rwv5wk81hkhmdezy89bb90nz9o41wqw87xabterzgm8imb30l","property":"websiteID"}}},"Pin":{"deleted":{"type":"boolean","required":false},"ownerID":{"type":"streamid","required":true},"pieceID":{"type":"streamid","required":true},"approved":{"type":"boolean","required":false},"artistID":{"type":"streamid","required":true},"rejected":{"type":"boolean","required":false},"websiteID":{"type":"streamid","required":true},"categoryID":{"type":"streamid","required":true},"rejectionReason":{"type":"string","required":false},"owner":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c6rwv5wk81hkhmdezy89bb90nz9o41wqw87xabterzgm8imb30l","property":"ownerID"}},"piece":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c9ks4j3t143lynpqd0rcdvv9qz887k329mnkyhebil9xsvqsqmb","property":"pieceID"}},"artist":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c8ovhe8v7kk89n5uplrh3v19tnkckl1rvd3fp229l11jho9gqum","property":"artistID"}},"website":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c79umg416zn1u52s57rhmmyivi4sz019znaoysjufo5cjafp4fq","property":"websiteID"}},"category":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c8yy6avq6svy30fwtlvjygkhkknt7ndd2ryyio8xhxx4pb5g4nh","property":"categoryID"}},"likes":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c8lk6odvtq2iw1bzq0zt0lbtcf0x4yj6bbrtfr7g8ct80mtnjqy","property":"pinID"}},"likesCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c8lk6odvtq2iw1bzq0zt0lbtcf0x4yj6bbrtfr7g8ct80mtnjqy","property":"pinID"}},"dislikes":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6ca97ehex06zmkkwllyljemkrfgk6rpnqucs1yn6eo8dywc9s82i","property":"pinID"}},"dislikesCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6ca97ehex06zmkkwllyljemkrfgk6rpnqucs1yn6eo8dywc9s82i","property":"pinID"}}},"Artist":{"name":{"type":"string","required":false},"pins":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c8hemzan3c0bdwka10ezqalv1j18dm6b0pkt9crig2b0cpdj3az","property":"artistID"}},"pinsCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c8hemzan3c0bdwka10ezqalv1j18dm6b0pkt9crig2b0cpdj3az","property":"artistID"}}},"EthAccountMetadata":{"createdAt":{"type":"string","required":true},"updatedAt":{"type":"string","required":true}},"EthAccountSettings":{"autoplay":{"type":"boolean","required":true}},"EthAccount":{"address":{"type":"string","required":true},"ensName":{"type":"string","required":false},"metadata":{"type":"reference","refType":"object","refName":"EthAccountMetadata","required":true},"settings":{"type":"reference","refType":"object","refName":"EthAccountSettings","required":true},"websiteID":{"type":"streamid","required":true},"pins":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c8hemzan3c0bdwka10ezqalv1j18dm6b0pkt9crig2b0cpdj3az","property":"ownerID"}},"pinsCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c8hemzan3c0bdwka10ezqalv1j18dm6b0pkt9crig2b0cpdj3az","property":"ownerID"}},"managedWebsites":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c9m54j0br516x9qni301svyu6onzxbsifcjusuzwhh6kgdrkigl","property":"adminID"}},"managedWebsitesCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c9m54j0br516x9qni301svyu6onzxbsifcjusuzwhh6kgdrkigl","property":"adminID"}},"pinLikes":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c8lk6odvtq2iw1bzq0zt0lbtcf0x4yj6bbrtfr7g8ct80mtnjqy","property":"ownerID"}},"pinLikesCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c8lk6odvtq2iw1bzq0zt0lbtcf0x4yj6bbrtfr7g8ct80mtnjqy","property":"ownerID"}},"pinDislikes":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6ca97ehex06zmkkwllyljemkrfgk6rpnqucs1yn6eo8dywc9s82i","property":"ownerID"}},"pinDislikesCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6ca97ehex06zmkkwllyljemkrfgk6rpnqucs1yn6eo8dywc9s82i","property":"ownerID"}}}},"enums":{},"accountData":{"adminList":{"type":"connection","name":"Admin"},"pieceList":{"type":"connection","name":"Piece"},"pinLikeList":{"type":"connection","name":"PinLike"},"pinDislikeList":{"type":"connection","name":"PinDislike"},"subscriptionList":{"type":"connection","name":"Subscription"},"categoryList":{"type":"connection","name":"Category"},"featuredList":{"type":"connection","name":"Featured"},"websiteList":{"type":"connection","name":"Website"},"pinList":{"type":"connection","name":"Pin"},"artistList":{"type":"connection","name":"Artist"},"ethAccountList":{"type":"connection","name":"EthAccount"}}}