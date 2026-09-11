export function PageHeaderFields({ data }: { data: { eyebrow: string; title: string; accent?: string; description: string } }) {
  return <div className="form-grid admin-editor-grid">
    <label>Etiqueta<input name="eyebrow" defaultValue={data.eyebrow} required/></label>
    <label>Título principal<input name="title" defaultValue={data.title} required/></label>
    {data.accent !== undefined && <label>Trecho em dourado<input name="accent" defaultValue={data.accent} required/></label>}
    <label className="full">Texto de apresentação<textarea name="description" rows={3} defaultValue={data.description} required/></label>
  </div>;
}

export function EditorCard({ number, children }: { number: number; children: React.ReactNode }) {
  return <fieldset className="admin-item-editor"><legend>Item {String(number).padStart(2,"0")}</legend><div className="form-grid admin-editor-grid">{children}</div></fieldset>;
}

export function SaveButton() { return <div className="admin-savebar"><span>As alterações aparecem no site assim que forem salvas.</span><button type="submit">Salvar alterações</button></div>; }
