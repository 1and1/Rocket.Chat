RocketChat.models.CredentialTokens = new class extends RocketChat.models._Base {
	const validForMilliseconds = 60000;		// Valid for 60 seconds

	constructor() {
		super('credential_tokens');

		this.tryEnsureIndex({ 'expireAt': 1 }, { sparse: 1, expireAfterSeconds: 0 });
	}

	create(_id, userInfo) {
		const token = {
			_id,
			userInfo,
			expireAt: new Date(Date.now() + this.validForMilliseconds)
		};

		this.insert(token);
		return token;
	}

	findOneById(_id) {
		const query = {
			_id,
			expireAt: { $gt: new Date() }
		};

		return this.findOne(query);
	}
};
