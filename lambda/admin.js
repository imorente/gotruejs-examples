exports.handler = async (event, context) => {
  const { identity = {}, user } = context.clientContext || {};
  const { payload } = parseJWT(identity.token);
  console.log({ payload, user });

  return {
    statusCode: 200,
    body: JSON.stringify({ payload, user })
  };
};

const parseJWT = (jwt = "") => {
  const [header, payload, signature] = jwt.split(".").map(decodeBase64);
  return {
    header: header && JSON.parse(header),
    payload: payload && JSON.parse(payload),
    signature
  };
};

const decodeBase64 = s => {
  return Buffer.from(s, "base64").toString("utf-8");
};
