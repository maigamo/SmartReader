import { readFileSync, writeFileSync } from "fs";

const targetVersion = process.argv[2];
const minAppVersion = process.argv[3];

// read minAppVersion from manifest.json if not provided
if (!minAppVersion) {
	const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
	const { minAppVersion: currentMinAppVersion } = manifest;
	if (!currentMinAppVersion)
		throw new Error(
			"No minAppVersion found in manifest.json and none provided as argument"
		);
}

// update manifest.json
let manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const { version } = manifest;
manifest.version = targetVersion;
writeFileSync("manifest.json", JSON.stringify(manifest, null, "\t"));

// update versions.json
let versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = minAppVersion;
writeFileSync("versions.json", JSON.stringify(versions, null, "\t")); 