export default class Site {
  name: string;
  address: string;
  usage: string = "";

  constructor(name: string, address: string, usage: string) {
    this.name = name;
    this.address = address;
    this.usage = usage;
  }

  static items: { [key: string]: Site } = {};
  static getOrCreate(name: string, address: string, usage: string): Site {
    if (Site.items[name]) {
      return Site.items[name];
    }

    Site.items[name] = new Site(name, address, usage);

    return Site.items[name];
  }

  static toObject(site: Site) {
    return {
      name: site.name,
      address: site.address,
      usage: site.usage,
    }
  }

  static fromObject(data: any) {
    return Site.getOrCreate(data.name, data.address, data.usage);
  }
}
