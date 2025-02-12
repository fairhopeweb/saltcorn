import { AbstractTag } from "@saltcorn/types/model-abstracts/abstract_tag";

export type NodeType = "view" | "page" | "table" | "trigger" | "dummy";

/**
 * resembles a node in the application-diagram
 */
export default abstract class Node {
  type: NodeType;
  name: string;
  label: string;
  cyId: string;
  objectId: number;
  linked = new Array<Node>();
  embedded = new Array<Node>();
  tables = new Array<Node>();
  trigger = new Array<Node>();
  tags = new Array<AbstractTag>();
  // 
  assignedTblIds = new Set<number>();

  /**
   * @param type saltcorn-entity type
   * @param label
   */
  constructor(
    type: NodeType,
    name: string,
    label: string,
    tags: Array<AbstractTag>,
    objectId: number,
  ) {
    this.type = type;
    this.label = label;
    this.cyId = `${type}_${label}`;
    this.tags = tags;
    this.objectId = objectId;
    this.name = name;
  }

  /**
   * returns data common for all subclasses
   * @returns cy node data
   */
  protected commonCyData(): any {
    return {
      id: this.cyId,
      type: this.type,
      name: this.name,
      label: this.label,
      tags: this.tags,
      objectId: this.objectId,
    };
  }

  /**
   * returns data specific to a subclass
   */
  abstract cyDataObject(): any;
}
