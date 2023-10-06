/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { RedisClient } from './redis-client';

@Injectable()
export class RedisClientWrapper {
    private readonly _client;
    constructor(private readonly redisClient: RedisClient) {
        this._client = this.redisClient.Client;
    }

    async setString(key: string, value: string) {
        try {
            return await this._client.set(key, value);
        } catch (error) {
            return null;
        }
    }
    async getString(key: string) {
        try {
            return await this._client.get(key);
        } catch (error) {
            return null;
        }
    }
    async setHash(key: string, field: string, value: unknown) {
        try {
            return await this._client.HSET(key, field, value);
        } catch (error) {
            return null;
        }
    }
    async getAllHash(hashKey: string) {
        try {
            return await this._client.HGETALL(hashKey);
        } catch (error) {
            return null;
        }
    }
    public setHashM(key: string, value: unknown, expiresAt = -1) {
        return new Promise((resolve, reject) => {
            this._client.hmset(key, value, (err, hashMReply) => {
                if (err) reject(err);
                else {
                    if (expiresAt > 0) this._client.expire(key, expiresAt);
                    resolve(hashMReply);
                }
            });
        });
    }
    public getHashM(hashKey: string, key: string[]) {
        return new Promise((resolve, reject) => {
            this._client.hmget(hashKey, key, (err, resultMHash) => {
                if (err) reject(err);
                else {
                    resolve(resultMHash);
                }
            });
        });
    }
    public delKey(key: string) {
        return new Promise((resolve, reject) => {
            this._client.del(key, (err, deleteReply) => {
                if (err) reject(err);
                else {
                    resolve(deleteReply);
                }
            });
        });
    }
}
