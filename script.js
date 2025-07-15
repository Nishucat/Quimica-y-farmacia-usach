body {
  font-family: Arial, sans-serif;
  margin: 20px;
  background: #f9f9f9;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

#malla-container {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 20px;
}

.semestre {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  min-width: 180px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 0.1);
}

.semestre h2 {
  text-align: center;
  margin-bottom: 15px;
}

.ramo {
  background: #ffefb2;
  padding: 10px;
  margin: 8px 0;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  border: 2px solid transparent;
  transition: background-color 0.3s, border-color 0.3s;
}

.ramo.locked {
  background: #ddd;
  cursor: not-allowed;
  color: #888;
}

.ramo.completed {
  background: #ffd54f;
  border-color: #f9a825;
  text-decoration: line-through;
}

.semestre[data-semestre="1"] .ramo { background: #fffae5; }
.semestre[data-semestre="2"] .ramo { background: #fff3e0; }
.semestre[data-semestre="3"] .ramo { background: #e1f5fe; }
.semestre[data-semestre="4"] .ramo { background: #f3e5f5; }
.semestre[data-semestre="5"] .ramo { background: #fff8e1; }
.semestre[data-semestre="6"] .ramo { background: #e8f5e9; }
.semestre[data-semestre="7"] .ramo { background: #ede7f6; }
.semestre[data-semestre="8"] .ramo { background: #fce4ec; }
.semestre[data-semestre="9"] .ramo { background: #e0f7fa; }
.semestre[data-semestre="10"] .ramo { background: #fffde7; }
