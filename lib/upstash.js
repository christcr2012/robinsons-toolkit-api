/**
 * UPSTASH Integration - Pure JavaScript
 * NO MCP dependencies
 */

async function upstashFetch(credentials, path, options = {}) {
  const url = path.startsWith('http') ? path : 'https://api.upstash.com' + path;
  const response = await fetch(url, { ...options });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

async function connect(credentials, args) {
    if (this.client?.isOpen) {
      return;
    }

    this.client = createClient({ url: this.config.url });
    this.client.on("error", (err) => console.error("Redis Client Error", err));
    await this.client.connect();
}

async function handleGet(credentials, args) {
    const value = await this.client!.get(args.key);
    return {
      content: [
        {
          type: "text",
          text: value !== null ? value : `Key "${args.key}" not found`,
        },
      ],
    };
}

async function handleSet(credentials, args) {
    if (args.ttl) {
      await this.client!.setEx(args.key, args.ttl, args.value);
    } else {
      await this.client!.set(args.key, args.value);
    }
    return {
      content: [
        {
          type: "text",
          text: `Set ${args.key}${args.ttl ? ` with TTL ${args.ttl}s` : ""}`,
        },
      ],
    };
}

async function handleDelete(credentials, args) {
    const count = await this.client!.del(args.keys);
    return {
  return response;
}

async function handleExists(credentials, args) {
    const count = await this.client!.exists(args.keys);
    return {
      content: [
        {
          type: "text",
          text: `${count} of ${args.keys.length} key(s) exist`,
        },
      ],
    };
}

async function handleTTL(credentials, args) {
    const ttl = await this.client!.ttl(args.key);
    let message;
    if (ttl === -2) message = `Key "${args.key}" does not exist`;
    else if (ttl === -1) message = `Key "${args.key}" has no expiration`;
    else message = `TTL: ${ttl} seconds`;

}

async function handleExpire(credentials, args) {
    const result = await this.client!.expire(args.key, args.seconds);
    return {
      content: [
        {
          type: "text",
          text: result
            ? `Set expiration for ${args.key} to ${args.seconds}s`
            : `Key "${args.key}" not found`,
        },
      ],
    };
}

async function handleListKeys(credentials, args) {
    const pattern = args.pattern || "*";
    const limit = args.limit || 100;
    const keys[] = [];

    for await (const key of this.client!.scanIterator({
      MATCH: pattern,
      COUNT: 100,
    })) {
      keys.push(key);
      if (keys.length >= limit) break;
    }

    return {
      content: [
        {
          type: "text",
          text: `Found ${keys.length} key(s):\n${keys.join("\n")}`,
        },
      ],
    };
}

async function handleDeleteByPattern(credentials, args) {
    if (!args.confirm) {
      return {
        content: [
          {
            type: "text",
            text: "Deletion cancelled. Set confirm=true to proceed.",
          },
        ],
      };
    }

    const keys[] = [];
    for await (const key of this.client!.scanIterator({
      MATCH: args.pattern,
      COUNT: 100,
    })) {
      keys.push(key);
    }

    if (keys.length === 0) {
      return {
        content: [
          { type: "text", text: `No keys found matching pattern "${args.pattern}"` },
        ],
      };
    }

    const count = await this.client!.del(keys);
    return {
      content: [
        {
          type: "text",
          text: `Deleted ${count} key(s) matching pattern "${args.pattern}"`,
        },
      ],
    };
}

async function handleMGet(credentials, args) {
    const values = await this.client!.mGet(args.keys);
    const results = args.keys.map((key, i) => ({
      key,
      value: values[i],
    }));

    return {
      content: [
        {
          type: "text",
        },
      ],
    };
}

async function handleInfo(credentials, args) {
    const info = await this.client!.info(args.section);
}

async function handleDBSize(credentials, args) {
    const size = await this.client!.dbSize();
    return {
  return response;
}

async function handleMemoryUsage(credentials, args) {
    const memory = await this.client!.memoryUsage(args.key);
    return {
      content: [
        {
          type: "text",
          text: memory
            ? `Memory usage: ${memory} bytes`
            : `Key "${args.key}" not found`,
        },
      ],
    };
}

async function handleListSessions(credentials, args) {
    const pattern = args.tenant_id
      ? `session:${args.tenant_id}:*`
      : "session:*";
    const limit = args.limit || 50;
    const sessions[] = [];

    for await (const key of this.client!.scanIterator({
      MATCH: pattern,
      COUNT: 100,
    })) {
      sessions.push(key);
      if (sessions.length >= limit) break;
    }

    return {
      content: [
        {
          type: "text",
          text: `Found ${sessions.length} session(s):\n${sessions.join("\n")}`,
        },
      ],
    };
}

async function handleInspectSession(credentials, args) {
    const key = args.session_id.startsWith("session:")
      ? args.session_id
      : `session:${args.session_id}`;
    const value = await this.client!.get(key);
    const ttl = await this.client!.ttl(key);

    if (!value) {
      return {
  return response;
    }

    return {
      content: [
        {
          type: "text",
          text: `Session: ${key}\nTTL: ${ttl}s\nData:\n${value}`,
        },
      ],
    };
}

async function handleClearTenantCache(credentials, args) {
    if (!args.confirm) {
      return {
        content: [
          {
            type: "text",
            text: "Cache clear cancelled. Set confirm=true to proceed.",
          },
        ],
      };
    }

    const pattern = `*:${args.tenant_id}:*`;
    const keys[] = [];

    for await (const key of this.client!.scanIterator({
      MATCH: pattern,
      COUNT: 100,
    })) {
      keys.push(key);
    }

    if (keys.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No cache entries found for tenant "${args.tenant_id}"`,
          },
        ],
      };
    }

    const count = await this.client!.del(keys);
    return {
      content: [
        {
          type: "text",
          text: `Cleared ${count} cache entries for tenant "${args.tenant_id}"`,
        },
      ],
    };
}

async function handleListRateLimits(credentials, args) {
    const pattern = args.user_id
      ? `ratelimit:${args.user_id}:*`
      : "ratelimit:*";
    const limit = args.limit || 50;
    const rateLimits[] = [];

    for await (const key of this.client!.scanIterator({
      MATCH: pattern,
      COUNT: 100,
    })) {
      rateLimits.push(key);
      if (rateLimits.length >= limit) break;
    }

    return {
      content: [
        {
          type: "text",
          text: `Found ${rateLimits.length} rate limit(s):\n${rateLimits.join("\n")}`,
        },
      ],
    };
}

async function handleCurrentDB(credentials, args) {
    return {
      content: [
        {
          type: "text",
          text: `Current database: ${this.currentDb}\nConnection: ${this.config.url}`,
        },
      ],
    };
}

async function handleFlushDB(credentials, args) {
    if (!args.confirm) {
      return {
        content: [
          {
            type: "text",
            text: "Flush cancelled. Set confirm=true to proceed. WARNING: This will delete ALL keys!",
          },
        ],
      };
    }

    await this.client!.flushDb();
    return {
      content: [
        { type: "text", text: "Database flushed. All keys have been deleted." },
      ],
    };
}

async function handleIncr(credentials, args) {
    const value = await this.client!.incr(args.key);
}

async function handleDecr(credentials, args) {
    const value = await this.client!.decr(args.key);
}

async function handleIncrBy(credentials, args) {
    const value = await this.client!.incrBy(args.key, args.increment);
}

async function handleDecrBy(credentials, args) {
    const value = await this.client!.decrBy(args.key, args.decrement);
}

async function handleAppend(credentials, args) {
    const length = await this.client!.append(args.key, args.value);
}

async function handleStrLen(credentials, args) {
    const length = await this.client!.strLen(args.key);
}

async function handleHSet(credentials, args) {
    await this.client!.hSet(args.key, args.field, args.value);
}

async function handleHGet(credentials, args) {
    const value = await this.client!.hGet(args.key, args.field);
}

async function handleHGetAll(credentials, args) {
    const hash = await this.client!.hGetAll(args.key);
}

async function handleHDel(credentials, args) {
    const count = await this.client!.hDel(args.key, args.fields);
}

async function handleHExists(credentials, args) {
    const exists = await this.client!.hExists(args.key, args.field);
}

async function handleHKeys(credentials, args) {
    const keys = await this.client!.hKeys(args.key);
}

async function handleHVals(credentials, args) {
    const values = await this.client!.hVals(args.key);
}

async function handleHLen(credentials, args) {
    const length = await this.client!.hLen(args.key);
}

async function handleLPush(credentials, args) {
    const length = await this.client!.lPush(args.key, args.values);
}

async function handleRPush(credentials, args) {
    const length = await this.client!.rPush(args.key, args.values);
}

async function handleLPop(credentials, args) {
    const value = args.count ? await this.client!.lPop(args.key, args.count) : await this.client!.lPop(args.key);
}

async function handleRPop(credentials, args) {
    const value = args.count ? await this.client!.rPop(args.key, args.count) : await this.client!.rPop(args.key);
}

async function handleLRange(credentials, args) {
    const values = await this.client!.lRange(args.key, args.start, args.stop);
}

async function handleLLen(credentials, args) {
    const length = await this.client!.lLen(args.key);
}

async function handleSAdd(credentials, args) {
    const count = await this.client!.sAdd(args.key, args.members);
}

async function handleSMembers(credentials, args) {
    const members = await this.client!.sMembers(args.key);
}

async function handleSRem(credentials, args) {
    const count = await this.client!.sRem(args.key, args.members);
}

async function handleSIsMember(credentials, args) {
    const isMember = await this.client!.sIsMember(args.key, args.member);
}

async function handleSCard(credentials, args) {
    const count = await this.client!.sCard(args.key);
}

async function handleZAdd(credentials, args) {
    const members = args.members.map((m) => ({ score: m.score, value: m.value }));
    const count = await this.client!.zAdd(args.key, members);
}

async function handleZRange(credentials, args) {
    const members = args.withScores
      ? await this.client!.zRangeWithScores(args.key, args.start, args.stop)
      : await this.client!.zRange(args.key, args.start, args.stop);
}

async function handleZRem(credentials, args) {
    const count = await this.client!.zRem(args.key, args.members);
}

async function handleZScore(credentials, args) {
    const score = await this.client!.zScore(args.key, args.member);
}

async function handleZCard(credentials, args) {
    const count = await this.client!.zCard(args.key);
}

async function handleZRank(credentials, args) {
    const rank = await this.client!.zRank(args.key, args.member);
}

async function handleType(credentials, args) {
    const type = await this.client!.type(args.key);
}

async function handleRename(credentials, args) {
    await this.client!.rename(args.oldKey, args.newKey);
}

async function handlePersist(credentials, args) {
    const result = await this.client!.persist(args.key);
}

async function handleXAdd(credentials, args) {
    const id = await this.client!.xAdd(args.key, args.id, args.fields);
}

async function handleXRead(credentials, args) {
    const options = {};
    if (args.count) options.COUNT = args.count;
    if (args.block !== undefined) options.BLOCK = args.block;
    const result = await this.client!.xRead(args.streams, options);
}

async function handleXRange(credentials, args) {
    const result = await this.client!.xRange(args.key, args.start, args.end, args.count ? { COUNT: args.count } : undefined);
}

async function handleXLen(credentials, args) {
    const length = await this.client!.xLen(args.key);
}

async function handleGeoAdd(credentials, args) {
    const count = await this.client!.geoAdd(args.key, args.members);
}

async function handleGeoDist(credentials, args) {
    const distance = await this.client!.geoDist(args.key, args.member1, args.member2, args.unit || 'm');
}

async function handleGeoRadius(credentials, args) {
    const result = await this.client!.geoRadius(args.key, { longitude: args.longitude, latitude: args.latitude }, args.radius, args.unit);
}

async function handlePfAdd(credentials, args) {
    const result = await this.client!.pfAdd(args.key, args.elements);
}

async function handlePfCount(credentials, args) {
    const count = await this.client!.pfCount(args.keys);
}

async function handleSetBit(credentials, args) {
    const oldValue = await this.client!.setBit(args.key, args.offset, args.value);
}

async function handleGetBit(credentials, args) {
    const value = await this.client!.getBit(args.key, args.offset);
}

async function handleBitCount(credentials, args) {
    const count = await this.client!.bitCount(args.key, args.start, args.end);
}

async function handleZRangeByScore(credentials, args) {
    const options = {};
    if (args.withscores) options.WITHSCORES = true;
    const result = await this.client!.zRangeByScore(args.key, args.min, args.max, options);
}

async function handleZIncrBy(credentials, args) {
    const newScore = await this.client!.zIncrBy(args.key, args.increment, args.member);
}

async function handleZCount(credentials, args) {
    const count = await this.client!.zCount(args.key, args.min, args.max);
}

async function handleScan(credentials, args) {
    const options = {};
    if (args.match) options.MATCH = args.match;
    if (args.count) options.COUNT = args.count;
    const result = await this.client!.scan(parseInt(args.cursor), options);
}

async function handleHScan(credentials, args) {
    const options = {};
    if (args.match) options.MATCH = args.match;
    if (args.count) options.COUNT = args.count;
    const result = await this.client!.hScan(args.key, parseInt(args.cursor), options);
}

async function handleSScan(credentials, args) {
    const options = {};
    if (args.match) options.MATCH = args.match;
    if (args.count) options.COUNT = args.count;
    const result = await this.client!.sScan(args.key, parseInt(args.cursor), options);
}

async function handleZScan(credentials, args) {
    const options = {};
    if (args.match) options.MATCH = args.match;
    if (args.count) options.COUNT = args.count;
    const result = await this.client!.zScan(args.key, parseInt(args.cursor), options);
}

async function handleGetRange(credentials, args) {
    const value = await this.client!.getRange(args.key, args.start, args.end);
}

async function handleSetRange(credentials, args) {
    const length = await this.client!.setRange(args.key, args.offset, args.value);
}

async function handleSInter(credentials, args) {
    const result = await this.client!.sInter(args.keys);
}

async function handleSUnion(credentials, args) {
    const result = await this.client!.sUnion(args.keys);
}

async function handleSDiff(credentials, args) {
    const result = await this.client!.sDiff(args.keys);
}

async function handleZUnionStore(credentials, args) {
    const options = { KEYS: args.keys };
    if (args.weights) options.WEIGHTS = args.weights;
    const count = await this.client!.zUnionStore(args.destination, args.keys, options);
}

async function handleZInterStore(credentials, args) {
    const options = { KEYS: args.keys };
    if (args.weights) options.WEIGHTS = args.weights;
    const count = await this.client!.zInterStore(args.destination, args.keys, options);
}

async function handleLInsert(credentials, args) {
    const length = await this.client!.lInsert(args.key, args.position, args.pivot, args.element);
}

async function handlePublish(credentials, args) {
    const count = await this.client!.publish(args.channel, args.message);
}

async function executeUpstashTool(toolName, args, credentials) {
  const tools = {
    'upstash_connect': connect,
    'upstash_handleGet': handleGet,
    'upstash_handleSet': handleSet,
    'upstash_handleDelete': handleDelete,
    'upstash_handleExists': handleExists,
    'upstash_handleTTL': handleTTL,
    'upstash_handleExpire': handleExpire,
    'upstash_handleListKeys': handleListKeys,
    'upstash_handleDeleteByPattern': handleDeleteByPattern,
    'upstash_handleMGet': handleMGet,
    'upstash_handleInfo': handleInfo,
    'upstash_handleDBSize': handleDBSize,
    'upstash_handleMemoryUsage': handleMemoryUsage,
    'upstash_handleListSessions': handleListSessions,
    'upstash_handleInspectSession': handleInspectSession,
    'upstash_handleClearTenantCache': handleClearTenantCache,
    'upstash_handleListRateLimits': handleListRateLimits,
    'upstash_handleCurrentDB': handleCurrentDB,
    'upstash_handleFlushDB': handleFlushDB,
    'upstash_handleIncr': handleIncr,
    'upstash_handleDecr': handleDecr,
    'upstash_handleIncrBy': handleIncrBy,
    'upstash_handleDecrBy': handleDecrBy,
    'upstash_handleAppend': handleAppend,
    'upstash_handleStrLen': handleStrLen,
    'upstash_handleHSet': handleHSet,
    'upstash_handleHGet': handleHGet,
    'upstash_handleHGetAll': handleHGetAll,
    'upstash_handleHDel': handleHDel,
    'upstash_handleHExists': handleHExists,
    'upstash_handleHKeys': handleHKeys,
    'upstash_handleHVals': handleHVals,
    'upstash_handleHLen': handleHLen,
    'upstash_handleLPush': handleLPush,
    'upstash_handleRPush': handleRPush,
    'upstash_handleLPop': handleLPop,
    'upstash_handleRPop': handleRPop,
    'upstash_handleLRange': handleLRange,
    'upstash_handleLLen': handleLLen,
    'upstash_handleSAdd': handleSAdd,
    'upstash_handleSMembers': handleSMembers,
    'upstash_handleSRem': handleSRem,
    'upstash_handleSIsMember': handleSIsMember,
    'upstash_handleSCard': handleSCard,
    'upstash_handleZAdd': handleZAdd,
    'upstash_handleZRange': handleZRange,
    'upstash_handleZRem': handleZRem,
    'upstash_handleZScore': handleZScore,
    'upstash_handleZCard': handleZCard,
    'upstash_handleZRank': handleZRank,
    'upstash_handleType': handleType,
    'upstash_handleRename': handleRename,
    'upstash_handlePersist': handlePersist,
    'upstash_handleXAdd': handleXAdd,
    'upstash_handleXRead': handleXRead,
    'upstash_handleXRange': handleXRange,
    'upstash_handleXLen': handleXLen,
    'upstash_handleGeoAdd': handleGeoAdd,
    'upstash_handleGeoDist': handleGeoDist,
    'upstash_handleGeoRadius': handleGeoRadius,
    'upstash_handlePfAdd': handlePfAdd,
    'upstash_handlePfCount': handlePfCount,
    'upstash_handleSetBit': handleSetBit,
    'upstash_handleGetBit': handleGetBit,
    'upstash_handleBitCount': handleBitCount,
    'upstash_handleZRangeByScore': handleZRangeByScore,
    'upstash_handleZIncrBy': handleZIncrBy,
    'upstash_handleZCount': handleZCount,
    'upstash_handleScan': handleScan,
    'upstash_handleHScan': handleHScan,
    'upstash_handleSScan': handleSScan,
    'upstash_handleZScan': handleZScan,
    'upstash_handleGetRange': handleGetRange,
    'upstash_handleSetRange': handleSetRange,
    'upstash_handleSInter': handleSInter,
    'upstash_handleSUnion': handleSUnion,
    'upstash_handleSDiff': handleSDiff,
    'upstash_handleZUnionStore': handleZUnionStore,
    'upstash_handleZInterStore': handleZInterStore,
    'upstash_handleLInsert': handleLInsert,
    'upstash_handlePublish': handlePublish,
  };
  const handler = tools[toolName];
  if (!handler) throw new Error(`Unknown tool: ${toolName}`);
  return handler(credentials, args);
}

module.exports = { executeUpstashTool };