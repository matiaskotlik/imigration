export async function raiseStatus(res: Response) {
  if (!res.ok) {
    await res.text().then((text) => {
      throw new Error(`HTTP error! status: ${res.status}, body: ${text}`);
    });
  }
  return res;
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
