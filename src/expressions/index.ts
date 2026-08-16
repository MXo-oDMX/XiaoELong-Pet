import basic from './basic/manifest.json';
import dinosaur from './dinosaur/manifest.json';
import food from './food/manifest.json';
import matcha from './matcha/manifest.json';
import matchaPlain from './matcha-plain/manifest.json';
import type { ExpressionPack } from '../types';

export const expressionPacks: ExpressionPack[] = [matcha, matchaPlain, dinosaur, basic, food];

export function getExpressionPack(packId: string): ExpressionPack | undefined {
  return expressionPacks.find((pack) => pack.id === packId);
}

export function getExpression(packId: string, expressionId: string) {
  const pack = getExpressionPack(packId);
  return pack?.expressions.find((item) => item.id === expressionId);
}

export function getDefaultExpression(packId: string) {
  const pack = getExpressionPack(packId);
  return pack?.expressions.find((item) => item.id === pack?.defaultExpressionId);
}
