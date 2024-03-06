import createApiClient from "./api.service";

    class AdminService {
        constructor(baseUrl = "/api/admin") {
        this.api = createApiClient(baseUrl);
    }

    async getQuyen() {
        try {
          return (await this.api.get("/quyen")).data;
        } catch (error) {
          console.error("Lỗi khi lấy quyền:", error);
          throw error; // Ném lỗi để xử lý ở cấp cao hơn
        }
      }
    async createQuyen(data) {
        return (await this.api.post("/quyen", data)).data;
    }

    // async deleteAllQuyen() {
    //     return (await this.api.delete("/quyen")).data;
    // }

    // async findQuyen(id) {
    //     return (await this.api.get(`/quyen/${id}`)).data;
    // }

    async updateQuyen(id, data) {
        return (await this.api.put(`/quyen/${id}`, data)).data;
    }

    async deleteQuyen(id) {
        return (await this.api.delete(`/quyen/${id}`)).data;
    }




    async getMonAn() {
        return (await this.api.get("/MonAn")).data;
    }
    
    async createMonAn(data) {
        return (await this.api.post("/MonAn", data)).data;
    }

  // async deleteAllMonAn() {
  //     return (await this.api.delete("/MonAn")).data;
  // }

  // async findMonAn(id) {
  //     return (await this.api.get(`/MonAn/${id}`)).data;
  // }

  async updateMonAn(id, data) {
      return (await this.api.put(`/MonAn/${id}`, data)).data;
  }

  async deleteMonAn(id) {
      return (await this.api.delete(`/MonAn/${id}`)).data;
  }
  async restoreMonAn(id) {
    return (await this.api.patch(`/MonAn/${id}`)).data;
}


async getDanhMuc() {
  try {
    return (await this.api.get("/DanhMuc")).data;
  } catch (error) {
    console.error("Lỗi khi lấy quyền:", error);
    throw error; // Ném lỗi để xử lý ở cấp cao hơn
  }
}

async createDanhMuc(data) {
    return (await this.api.post("/DanhMuc", data)).data;
}

// async deleteAllDanhMuc() {
//     return (await this.api.delete("/DanhMuc")).data;
// }

async findDanhMuc(id) {
    return (await this.api.get(`/DanhMuc/${id}`)).data;
}

async updateDanhMuc(id, data) {
    return (await this.api.put(`/DanhMuc/${id}`, data)).data;
}

async deleteDanhMuc(id) {
    return (await this.api.delete(`/DanhMuc/${id}`)).data;
}

async hideDanhMuc(id) {
  return (await this.api.delete(`/DanhMuc/${id}`)).data;
}


// async getVaiTro() {
//   try {
//     return (await this.api.get("/VaiTro")).data;
//   } catch (error) {
//     console.error("Lỗi khi lấy quyền:", error);
//     throw error; // Ném lỗi để xử lý ở cấp cao hơn
//   }
// }
async getDMMA() {
  try {
    return (await this.api.patch("/danhmuc")).data;
  } catch (error) {
    console.error("Lỗi khi lấy danh muc:", error);
    throw error; // Ném lỗi để xử lý ở cấp cao hơn
  }
}

async getMAVT() {
  try {
    return (await this.api.get("/VaiTro/ma")).data;
  } catch (error) {
    console.error("Lỗi khi lấy quyền:", error);
    throw error; // Ném lỗi để xử lý ở cấp cao hơn
  }
}


async createVaiTro(data) {
  return (await this.api.post("/VaiTro", data)).data;
}

// async deleteAllVaiTro() {
//     return (await this.api.delete("/VaiTro")).data;
// }

// async findVaiTro(id) {
//     return (await this.api.get(`/VaiTro/${id}`)).data;
// }

async updateVaiTro(id, data) {
  return (await this.api.put(`/VaiTro/${id}`, data)).data;
}

async deleteVaiTro(id) {
  return (await this.api.delete(`/VaiTro/${id}`)).data;
}



async getNhanVien() {
  try {
    return (await this.api.get("/nhanvien")).data;
  } catch (error) {
    console.error("Lỗi khi lấy quyền:", error);
    throw error; // Ném lỗi để xử lý ở cấp cao hơn
  }
}
async createNhanVien(data) {
  return (await this.api.post("/NhanVien", data)).data;
}

// async deleteAllNhanVien() {
//     return (await this.api.delete("/NhanVien")).data;
// }

// async findNhanVien(id) {
//     return (await this.api.get(`/NhanVien/${id}`)).data;
// }

async updateNhanVien(id, data) {
  return (await this.api.put(`/NhanVien/${id}`, data)).data;
}

async deleteNhanVien(id) {
  return (await this.api.delete(`/NhanVien/${id}`)).data;
}

  
async getHoaDon() {
  try {
    return (await this.api.get("/HoaDon")).data;
  } catch (error) {
    console.error("Lỗi khi lấy quyền:", error);
    throw error; // Ném lỗi để xử lý ở cấp cao hơn
  }
}
async createHoaDon(data) {
  return (await this.api.post("/HoaDon", data)).data;
}
async createCTHD(data) {
  return (await this.api.post("/CTHD", data)).data;
}

async deleteHoaDon() {
    return (await this.api.delete("/HoaDon")).data;
}

async findHoaDon(id) {
    return (await this.api.get(`/HoaDon/${id}`)).data;
}

async updateHoaDon(id, data) {
  return (await this.api.put(`/HoaDon/${id}`, data)).data;
}

async deleteHoaDon(id) {
  return (await this.api.delete(`/HoaDon/${id}`)).data;
}


}
export default new AdminService();