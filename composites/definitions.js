// This is an auto-generated file, do not edit manually
export const definition = {"models":{"Piece":{"id":"kjzl6hvfrbw6c61twsahib754lk771maqkd601e3wwam1l510gju7ixa1bvop1r","accountRelation":{"type":"list"}},"Subscription":{"id":"kjzl6hvfrbw6c9q3scsgikhbq9moj1tbqj5hj2jy7yjb2so1p3826tyt1shsmn7","accountRelation":{"type":"list"}},"Admin":{"id":"kjzl6hvfrbw6c5bllhxy8dqvmq7r5vyohdhjbfmdmoh3qyvvqq23nbyrasqxhcc","accountRelation":{"type":"list"}},"Website":{"id":"kjzl6hvfrbw6c5rqzlprdkhskz1ziw66dcx4bfs1iqz42xqcrpf8lf6ujhiu3b6","accountRelation":{"type":"list"}},"EthAccount":{"id":"kjzl6hvfrbw6c8k1a0yeej8zz5r1170ix5tq0bk6tni30iywbmenwv0h8pqzi4p","accountRelation":{"type":"list"}}},"objects":{"PieceMetadata":{"createdAt":{"type":"string","required":true},"updatedAt":{"type":"string","required":true}},"Piece":{"cid":{"type":"string","required":false},"name":{"type":"string","required":false},"ownerID":{"type":"streamid","required":true},"approved":{"type":"boolean","required":false},"category":{"type":"string","required":false},"metadata":{"type":"reference","refType":"object","refName":"PieceMetadata","required":true},"rejected":{"type":"boolean","required":false},"websiteID":{"type":"streamid","required":true},"rejectionReason":{"type":"string","required":false},"owner":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c8k1a0yeej8zz5r1170ix5tq0bk6tni30iywbmenwv0h8pqzi4p","property":"ownerID"}},"website":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c5rqzlprdkhskz1ziw66dcx4bfs1iqz42xqcrpf8lf6ujhiu3b6","property":"websiteID"}}},"SubscriptionMetadata":{"createdAt":{"type":"string","required":true},"updatedAt":{"type":"string","required":true}},"Subscription":{"metadata":{"type":"reference","refType":"object","refName":"SubscriptionMetadata","required":true},"websiteID":{"type":"streamid","required":true},"subscribedID":{"type":"streamid","required":true},"website":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c5rqzlprdkhskz1ziw66dcx4bfs1iqz42xqcrpf8lf6ujhiu3b6","property":"websiteID"}},"subscribedWebsite":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c5rqzlprdkhskz1ziw66dcx4bfs1iqz42xqcrpf8lf6ujhiu3b6","property":"subscribedID"}}},"AdminMetadata":{"createdAt":{"type":"string","required":true},"updatedAt":{"type":"string","required":true}},"Admin":{"super":{"type":"boolean","required":true},"adminID":{"type":"streamid","required":true},"inactive":{"type":"boolean","required":false},"metadata":{"type":"reference","refType":"object","refName":"AdminMetadata","required":true},"websiteID":{"type":"streamid","required":true},"admin":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c8k1a0yeej8zz5r1170ix5tq0bk6tni30iywbmenwv0h8pqzi4p","property":"adminID"}},"website":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c5rqzlprdkhskz1ziw66dcx4bfs1iqz42xqcrpf8lf6ujhiu3b6","property":"websiteID"}}},"WebsiteMetadata":{"createdAt":{"type":"string","required":true},"updatedAt":{"type":"string","required":true}},"Website":{"image":{"type":"string","required":false},"metadata":{"type":"reference","refType":"object","refName":"WebsiteMetadata","required":true},"description":{"type":"string","required":false},"websiteName":{"type":"string","required":true},"pieces":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c61twsahib754lk771maqkd601e3wwam1l510gju7ixa1bvop1r","property":"websiteID"}},"piecesCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c61twsahib754lk771maqkd601e3wwam1l510gju7ixa1bvop1r","property":"websiteID"}},"subscriptions":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c9q3scsgikhbq9moj1tbqj5hj2jy7yjb2so1p3826tyt1shsmn7","property":"websiteID"}},"subscriptionsCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c9q3scsgikhbq9moj1tbqj5hj2jy7yjb2so1p3826tyt1shsmn7","property":"websiteID"}},"admins":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c5bllhxy8dqvmq7r5vyohdhjbfmdmoh3qyvvqq23nbyrasqxhcc","property":"websiteID"}},"adminsCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c5bllhxy8dqvmq7r5vyohdhjbfmdmoh3qyvvqq23nbyrasqxhcc","property":"websiteID"}},"users":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c8k1a0yeej8zz5r1170ix5tq0bk6tni30iywbmenwv0h8pqzi4p","property":"websiteID"}},"usersCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c8k1a0yeej8zz5r1170ix5tq0bk6tni30iywbmenwv0h8pqzi4p","property":"websiteID"}}},"EthAccountMetadata":{"createdAt":{"type":"string","required":true},"updatedAt":{"type":"string","required":true}},"EthAccount":{"address":{"type":"string","required":true},"ensName":{"type":"string","required":false},"metadata":{"type":"reference","refType":"object","refName":"EthAccountMetadata","required":true},"websiteID":{"type":"streamid","required":true},"pieces":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c61twsahib754lk771maqkd601e3wwam1l510gju7ixa1bvop1r","property":"ownerID"}},"piecesCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c61twsahib754lk771maqkd601e3wwam1l510gju7ixa1bvop1r","property":"ownerID"}},"managedWebsites":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c5bllhxy8dqvmq7r5vyohdhjbfmdmoh3qyvvqq23nbyrasqxhcc","property":"adminID"}},"managedWebsitesCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c5bllhxy8dqvmq7r5vyohdhjbfmdmoh3qyvvqq23nbyrasqxhcc","property":"adminID"}}}},"enums":{},"accountData":{"pieceList":{"type":"connection","name":"Piece"},"subscriptionList":{"type":"connection","name":"Subscription"},"adminList":{"type":"connection","name":"Admin"},"websiteList":{"type":"connection","name":"Website"},"ethAccountList":{"type":"connection","name":"EthAccount"}}}